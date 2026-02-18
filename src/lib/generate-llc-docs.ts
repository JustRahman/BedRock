import {
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Packer,
  TabStopPosition,
  TabStopType,
  UnderlineType,
} from 'docx'

export interface LLCDocData {
  llcName: string
  state: string
  formationDate: string
  filingOffice: string
  members: { name: string; address?: string; contribution?: string; percentage?: string }[]
  organizerName: string
  signingDate: string
  registeredAgent: string
  businessPurpose?: string
  ein?: string
}

function stateName(code: string): string {
  const states: Record<string, string> = {
    DE: 'Delaware',
    WY: 'Wyoming',
    NV: 'Nevada',
    TX: 'Texas',
    FL: 'Florida',
    CA: 'California',
    NY: 'New York',
  }
  return states[code] || code
}

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr + 'T00:00:00')
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return {
    day: String(d.getDate()),
    month: months[d.getMonth()],
    year: String(d.getFullYear()),
  }
}

function bold(text: string): TextRun {
  return new TextRun({ text, bold: true })
}

function normal(text: string): TextRun {
  return new TextRun({ text })
}

function underline(text: string): TextRun {
  return new TextRun({ text, underline: { type: UnderlineType.SINGLE } })
}

export async function generateStatementOfOrganizer(data: LLCDocData): Promise<Buffer> {
  const fullState = stateName(data.state)
  const formDate = formatDate(data.formationDate)
  const signDate = formatDate(data.signingDate)

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'Statement of Organizer',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'in Lieu of Organization Meeting',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: `of ${data.llcName}`,
                bold: true,
                size: 24,
              }),
            ],
          }),

          // Body
          new Paragraph({
            spacing: { after: 200 },
            children: [
              normal('THE UNDERSIGNED, being the Organizer of '),
              underline(data.llcName),
              normal(`, a Limited Liability Company of the State of ${fullState}, does hereby adopt the following resolutions and takes the following action by written consent in lieu of a meeting.`),
            ],
          }),

          // Resolution 1
          new Paragraph({
            spacing: { after: 200 },
            children: [
              bold('RESOLVED'),
              normal(', that a copy of the Articles of Organization of '),
              underline(data.llcName),
              normal(`, as filed in the Office of the ${data.filingOffice} on the ${formDate.day} of ${formDate.month}, ${formDate.year}, be, and the same hereby is, ordered filed in the minute book of the Limited Liability Company; and`),
            ],
          }),

          // Resolution 2
          new Paragraph({
            spacing: { after: 200 },
            children: [
              bold('RESOLVED'),
              normal(', that the number of initial Members forming this Limited Liability Company shall be at least one (1); and'),
            ],
          }),

          // Resolution 3
          new Paragraph({
            spacing: { after: 200 },
            children: [
              bold('RESOLVED'),
              normal(', that from this day hence, the undersigned has fulfilled the duties of Organizer and relinquishes all further duties to the Members of '),
              underline(data.llcName),
              normal('; and'),
            ],
          }),

          // Resolution 4
          new Paragraph({
            spacing: { after: 200 },
            children: [
              bold('RESOLVED'),
              normal(', that simultaneous with the Organizer\'s transfer of all further duties to the Members, the said Organizer resigns such office effective this date; and'),
            ],
          }),

          // Resolution 5 - Members
          new Paragraph({
            spacing: { after: 200 },
            children: [
              bold('RESOLVED'),
              normal(', that the following named persons shall constitute the initial Members of '),
              underline(data.llcName),
              normal(':'),
            ],
          }),

          // List members
          ...data.members.map(
            (m) =>
              new Paragraph({
                spacing: { after: 100 },
                indent: { left: 720 },
                children: [normal(m.name)],
              })
          ),

          // Signature block
          new Paragraph({ spacing: { after: 400 }, children: [] }),

          new Paragraph({
            spacing: { after: 200 },
            children: [
              normal(`Signed and executed by the Organizer on the ${signDate.day} of ${signDate.month}, ${signDate.year}.`),
            ],
          }),

          new Paragraph({ spacing: { after: 400 }, children: [] }),

          new Paragraph({
            spacing: { after: 100 },
            children: [normal('________________________________')],
          }),
          new Paragraph({
            children: [
              normal(`By: ${data.organizerName}, Authorized Person/Organizer`),
            ],
          }),
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return Buffer.from(buffer)
}

export async function generateOperatingAgreement(data: LLCDocData): Promise<Buffer> {
  const fullState = stateName(data.state)
  const formDate = formatDate(data.formationDate)
  const signDate = formatDate(data.signingDate)
  const purpose = data.businessPurpose || 'any lawful purpose'

  const sectionHeading = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 200 },
      children: [new TextRun({ text, bold: true, size: 24 })],
    })

  const subHeading = (label: string, content: TextRun[]) =>
    new Paragraph({
      spacing: { after: 200 },
      children: [new TextRun({ text: `${label}: `, bold: true }), ...content],
    })

  const bodyPara = (children: TextRun[]) =>
    new Paragraph({ spacing: { after: 200 }, children })

  // Build member contribution rows
  const memberParagraphs: Paragraph[] = []
  data.members.forEach((m, i) => {
    memberParagraphs.push(
      new Paragraph({
        spacing: { after: 100 },
        tabStops: [
          { type: TabStopType.LEFT, position: TabStopPosition.MAX / 3 },
          { type: TabStopType.LEFT, position: (TabStopPosition.MAX * 2) / 3 },
        ],
        children: [
          normal(`(${i + 1}) ${m.name}`),
          new TextRun({ text: `\t${m.contribution || 'Cash'}` }),
          new TextRun({ text: `\t${m.percentage || `${Math.floor(100 / data.members.length)}%`}` }),
        ],
      })
    )
    if (m.address) {
      memberParagraphs.push(
        new Paragraph({
          spacing: { after: 100 },
          indent: { left: 360 },
          children: [normal(m.address)],
        })
      )
    }
  })

  // Signature blocks for each member
  const signatureBlocks: Paragraph[] = []
  data.members.forEach((m) => {
    signatureBlocks.push(
      new Paragraph({ spacing: { before: 400, after: 100 }, children: [] }),
      new Paragraph({
        spacing: { after: 100 },
        children: [normal(`Date: ${signDate.month} ${signDate.day}, ${signDate.year}`)],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [normal('Signature: ________________________________')],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [normal(`Printed Name: ${m.name}, Member`)],
      })
    )
  })

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'OPERATING AGREEMENT', bold: true, size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'FOR', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({ text: 'MEMBER-MANAGED LIMITED LIABILITY COMPANY', bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: data.llcName, bold: true, size: 26 }),
            ],
          }),

          // PRELIMINARY PROVISIONS
          sectionHeading('PRELIMINARY PROVISIONS'),

          subHeading('Effective Date', [
            normal(`This operating agreement of ${data.llcName}, effective ${signDate.month} ${signDate.day}, ${signDate.year}, is adopted by the members whose signatures appear at the end of this agreement (the "Agreement").`),
          ]),

          subHeading('Formation', [
            normal(`This limited liability company (LLC) was formed by filing Articles of Organization, a Certificate of Formation or a similar organizational document with the LLC filing office of the state of ${fullState} on ${formDate.month} ${formDate.day}, ${formDate.year}. A copy of this organizational document has been placed in the LLC's records book.`),
          ]),

          subHeading('Name', [
            normal(`The formal name of this LLC is ${data.llcName}. However, this LLC may do business under a different name by complying with the state's fictitious or assumed business name statutes and procedures.`),
          ]),

          subHeading('Registered Office and Agent', [
            normal(`The registered office of this LLC and the registered agent at this address are as follows: ${data.registeredAgent}. The registered office and agent may be changed from time to time as the members may see fit, by filing a change of registered agent or office form with the state LLC filing office.`),
          ]),

          subHeading('Business Purposes', [
            normal(`The specific business purposes and activities contemplated by the founders of this LLC at the time of initial signing of this agreement consist of the following: ${purpose}. It is understood that the foregoing statement of purposes shall not serve as a limitation on the powers or abilities of this LLC, which shall be permitted to engage in any and all lawful business activities.`),
          ]),

          subHeading('Duration of LLC', [
            normal('The duration of this LLC shall be perpetual. Further, this LLC shall terminate when a proposal to dissolve the LLC is adopted by the membership of this LLC or when this LLC is otherwise terminated in accordance with law.'),
          ]),

          // MEMBERSHIP PROVISIONS
          sectionHeading('MEMBERSHIP PROVISIONS'),

          subHeading('Non-liability of Members', [
            normal('No member of this LLC shall be personally liable for the expenses, debts, obligations or liabilities of the LLC, or for claims made against it.'),
          ]),

          subHeading('Reimbursement for Organizational Costs', [
            normal('Members shall be reimbursed by the LLC for organizational expenses paid by the members. The LLC shall be authorized to elect to deduct organizational expenses and start-up expenditures ratably over a period of time as permitted by the Internal Revenue Code and as may be advised by the LLC\'s tax advisor.'),
          ]),

          subHeading('Management', [
            normal('This LLC shall be managed exclusively by all of its members.'),
          ]),

          subHeading('Members\' Percentage Interests', [
            normal('A member\'s percentage interest in this LLC shall be computed as a fraction, the numerator of which is the total of a member\'s capital account and the denominator of which is the total of all capital accounts of all members. This fraction shall be expressed in this agreement as a percentage, which shall be called each member\'s "percentage interest" in this LLC.'),
          ]),

          subHeading('Membership Voting', [
            normal('Except as otherwise may be required by the Articles of Organization, Certificate of Formation or a similar organizational document, other provisions of this operating agreement, or under the laws of this state, each member shall vote on any matter submitted to the membership for approval in proportion to the member\'s percentage interest in this LLC.'),
          ]),

          subHeading('Compensation', [
            normal('Members shall not be paid as members of the LLC for performing any duties associated with such membership, including management of the LLC. Members may be paid, however, for any services rendered in any other capacity for the LLC, whether as officers, employees, independent contractors or otherwise.'),
          ]),

          // TAX AND FINANCIAL PROVISIONS
          sectionHeading('TAX AND FINANCIAL PROVISIONS'),

          subHeading('Tax Classification of LLC', [
            normal('The members of this LLC intend that this LLC be initially classified as a partnership for federal and, if applicable, state income tax purposes. It is understood that all members may agree to change the tax treatment of this LLC by signing, or authorizing the signature of, IRS Form 8832, Entity Classification Election, and filing it with the IRS and, if applicable, the state tax department within the prescribed time limits.'),
          ]),

          subHeading('Tax Year and Accounting Method', [
            normal('The tax year of this LLC shall be the calendar year. The LLC shall use the cash method of accounting. Both the tax year and the accounting period of the LLC may be changed with the consent of all members.'),
          ]),

          subHeading('Annual Income Tax Returns and Reports', [
            normal('Within 60 days after the end of each tax year of the LLC, a copy of the LLC\'s state and federal income tax returns for the preceding tax year shall be mailed or otherwise provided to each member of the LLC, together with any additional information and forms necessary for each member to complete his or her individual state and federal income tax returns.'),
          ]),

          subHeading('Bank Accounts', [
            normal('The LLC shall designate one or more banks or other institutions for the deposit of the funds of the LLC, and shall establish savings, checking, investment and other such accounts as are reasonable and necessary for its business and investments. The funds of the LLC, however and wherever deposited or invested, shall not be commingled with the personal funds of any members of the LLC.'),
          ]),

          subHeading('Title to Assets', [
            normal('All personal and real property of this LLC shall be held in the name of the LLC, not in the names of individual members.'),
          ]),

          // CAPITAL PROVISIONS
          sectionHeading('CAPITAL PROVISIONS'),

          subHeading('Capital Contributions by Members', [
            normal('Members shall make the following contributions of cash, property or services as shown next to each member\'s name below:'),
          ]),

          // Table header
          new Paragraph({
            spacing: { after: 100 },
            tabStops: [
              { type: TabStopType.LEFT, position: TabStopPosition.MAX / 3 },
              { type: TabStopType.LEFT, position: (TabStopPosition.MAX * 2) / 3 },
            ],
            children: [
              bold('NAME'),
              new TextRun({ text: '\tCONTRIBUTION', bold: true }),
              new TextRun({ text: '\t% INTEREST', bold: true }),
            ],
          }),

          ...memberParagraphs,

          subHeading('No Interest on Capital Contributions', [
            normal('No interest shall be paid on funds or property contributed as capital to this LLC, or on funds reflected in the capital accounts of the members.'),
          ]),

          subHeading('Allocations of Profits and Losses', [
            normal('The profits and losses of the LLC, and all items of its income, gain, loss, deduction and credit shall be allocated to members according to each member\'s percentage interest in this LLC.'),
          ]),

          // MEMBERSHIP WITHDRAWAL AND TRANSFER PROVISIONS
          sectionHeading('MEMBERSHIP WITHDRAWAL AND TRANSFER PROVISIONS'),

          subHeading('Withdrawal of Members', [
            normal('A member may withdraw from this LLC by giving written notice to all other members at least 60 days before the date the withdrawal is to be effective.'),
          ]),

          subHeading('Restrictions on the Transfer of Membership', [
            normal('A member shall not transfer his or her membership in the LLC unless all non-transferring members in the LLC first agree to approve the admission of the transferee into this LLC.'),
          ]),

          // DISSOLUTION PROVISIONS
          sectionHeading('DISSOLUTION PROVISIONS'),

          subHeading('Events That Trigger Dissolution of the LLC', [
            normal('The following events shall trigger dissolution of the LLC, except as provided: the death, permanent incapacity, bankruptcy, retirement, resignation or expulsion of a member, except that within 90 days of the happening of any of these events, all remaining members of the LLC may vote to continue the legal existence of the LLC; the expiration of the term of existence of the LLC; the written agreement of all members to dissolve the LLC; entry of a decree of dissolution of the LLC under state law.'),
          ]),

          // GENERAL PROVISIONS
          sectionHeading('GENERAL PROVISIONS'),

          subHeading('Officers', [
            normal('The LLC may designate one or more officers, such as a President, Vice President, Secretary and Treasurer. Persons who fill these positions need not be members of the LLC.'),
          ]),

          subHeading('Records', [
            normal('The LLC shall keep at its principal business address a copy of all proceedings of membership meetings, as well as books of account of the LLC\'s financial transactions.'),
          ]),

          subHeading('Indemnification', [
            normal('The LLC shall indemnify the Members and those authorized officers, agents, and employees of the LLC for all costs, losses, liabilities and damages paid or accrued in connection with the business of the LLC, except to the extent prohibited by the laws of the state that governs this Agreement.'),
          ]),

          subHeading('Mediation and Arbitration', [
            normal('In any dispute over the provisions of this operating agreement and in other disputes among the members, if the members cannot resolve the dispute to their mutual satisfaction, the matter shall be submitted to mediation. If mediation proves impossible, the dispute may be submitted to arbitration in accordance with the rules of the American Arbitration Association.'),
          ]),

          subHeading('Governing Law', [
            normal(`This Agreement shall be governed by, and interpreted and enforced in accordance with, the substantive laws of the State of ${fullState}.`),
          ]),

          subHeading('Entire Agreement', [
            normal('This operating agreement represents the entire agreement among the members of this LLC, and it shall not be amended, modified or replaced except by a written instrument executed by all the parties to this agreement who are current members of this LLC.'),
          ]),

          subHeading('Severability', [
            normal('If any provision of this agreement is determined by a court or arbitrator to be invalid, unenforceable or otherwise ineffective, that provision shall be severed from the rest of this agreement, and the remaining provisions shall remain in effect and enforceable.'),
          ]),

          // SIGNATURES
          sectionHeading('SIGNATURES OF MEMBERS'),

          bodyPara([
            normal('In witness whereof, the members of this LLC sign and adopt this agreement as the operating agreement of this LLC.'),
          ]),

          ...signatureBlocks,
        ],
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  return Buffer.from(buffer)
}
