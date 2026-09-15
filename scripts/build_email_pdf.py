"""
Generate a business-letter PDF from the email to Mrs Georgian (HR).
Stack: ReportLab + Tinos (Times-style serif) + Carlito (sans for headings/code).
Output: /home/z/my-project/download/email_to_hr_georgian.pdf
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable,
)
from reportlab.platypus.flowables import Flowable

# ---------------------------------------------------------------------------
# 1. Font registration
# ---------------------------------------------------------------------------
ENG_DIR = "/usr/share/fonts/truetype/english"
LIB_DIR = "/usr/share/fonts/truetype/liberation"

# Liberation Serif (Times-equivalent) for body — Tinos files in this env are corrupt
pdfmetrics.registerFont(TTFont("BodySerif", f"{LIB_DIR}/LiberationSerif-Regular.ttf"))
pdfmetrics.registerFont(TTFont("BodySerif-Bold", f"{LIB_DIR}/LiberationSerif-Bold.ttf"))
pdfmetrics.registerFont(TTFont("BodySerif-Italic", f"{LIB_DIR}/LiberationSerif-Italic.ttf"))
pdfmetrics.registerFont(TTFont("BodySerif-BoldItalic", f"{LIB_DIR}/LiberationSerif-BoldItalic.ttf"))
registerFontFamily(
    "BodySerif",
    normal="BodySerif",
    bold="BodySerif-Bold",
    italic="BodySerif-Italic",
    boldItalic="BodySerif-BoldItalic",
)

# Carlito for headings/UI
pdfmetrics.registerFont(TTFont("Carlito", f"{ENG_DIR}/Carlito-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Carlito-Bold", f"{ENG_DIR}/Carlito-Bold.ttf"))
registerFontFamily("Carlito", normal="Carlito", bold="Carlito-Bold")

DEJA_DIR = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("DejaVuMono", f"{DEJA_DIR}/DejaVuSansMono.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuMono-Bold", f"{DEJA_DIR}/DejaVuSansMono-Bold.ttf"))
registerFontFamily("DejaVuMono", normal="DejaVuMono", bold="DejaVuMono-Bold")

# ---------------------------------------------------------------------------
# 2. Palette
# ---------------------------------------------------------------------------
INK         = colors.HexColor("#0F172A")
INK_SOFT    = colors.HexColor("#334155")
ACCENT      = colors.HexColor("#1E40AF")
RULE        = colors.HexColor("#1E40AF")
PAPER       = colors.HexColor("#FFFFFF")
CODE_BG     = colors.HexColor("#0F172A")
CODE_FG     = colors.HexColor("#E2E8F0")
TABLE_HDR   = colors.HexColor("#1E40AF")
TABLE_HDR_F = colors.HexColor("#FFFFFF")
TABLE_ALT   = colors.HexColor("#F1F5F9")
TABLE_BORDER = colors.HexColor("#CBD5E1")

# ---------------------------------------------------------------------------
# 3. Styles
# ---------------------------------------------------------------------------
ss = getSampleStyleSheet()

S = {
    "company": ParagraphStyle(
        "company", parent=ss["Normal"],
        fontName="Carlito-Bold", fontSize=18, leading=22,
        textColor=ACCENT, alignment=TA_LEFT, spaceAfter=2,
    ),
    "company_meta": ParagraphStyle(
        "company_meta", parent=ss["Normal"],
        fontName="Carlito", fontSize=8.5, leading=12,
        textColor=INK_SOFT, alignment=TA_LEFT, spaceAfter=2,
    ),
    "meta_label": ParagraphStyle(
        "meta_label", parent=ss["Normal"],
        fontName="Carlito-Bold", fontSize=9.5, leading=13,
        textColor=INK_SOFT, alignment=TA_LEFT,
    ),
    "meta_value": ParagraphStyle(
        "meta_value", parent=ss["Normal"],
        fontName="BodySerif", fontSize=10.5, leading=14,
        textColor=INK, alignment=TA_LEFT,
    ),
    "h2": ParagraphStyle(
        "h2", parent=ss["Heading2"],
        fontName="Carlito-Bold", fontSize=12.5, leading=16,
        textColor=ACCENT, alignment=TA_LEFT,
        spaceBefore=14, spaceAfter=6,
        keepWithNext=True,
    ),
    "h3": ParagraphStyle(
        "h3", parent=ss["Heading3"],
        fontName="Carlito-Bold", fontSize=10.5, leading=14,
        textColor=INK, alignment=TA_LEFT,
        spaceBefore=10, spaceAfter=4,
        keepWithNext=True,
    ),
    "body": ParagraphStyle(
        "body", parent=ss["Normal"],
        fontName="BodySerif", fontSize=10.5, leading=15.5,
        textColor=INK, alignment=TA_JUSTIFY,
        spaceAfter=6,
        firstLineIndent=0,
    ),
    "bullet": ParagraphStyle(
        "bullet", parent=ss["Normal"],
        fontName="BodySerif", fontSize=10.5, leading=14.5,
        textColor=INK, alignment=TA_LEFT,
        leftIndent=14, bulletIndent=2, spaceAfter=3,
    ),
    "num": ParagraphStyle(
        "num", parent=ss["Normal"],
        fontName="BodySerif", fontSize=10.5, leading=14.5,
        textColor=INK, alignment=TA_JUSTIFY,
        leftIndent=18, bulletIndent=2, spaceAfter=6,
    ),
    "sig": ParagraphStyle(
        "sig", parent=ss["Normal"],
        fontName="BodySerif", fontSize=10.5, leading=14,
        textColor=INK, alignment=TA_LEFT,
        spaceAfter=2,
    ),
}


# ---------------------------------------------------------------------------
# 4. Page template (header rule + footer page number)
# ---------------------------------------------------------------------------
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(doc.leftMargin, A4[1] - doc.topMargin + 14,
                A4[0] - doc.rightMargin, A4[1] - doc.topMargin + 14)
    canvas.setFont("Carlito", 8)
    canvas.setFillColor(INK_SOFT)
    canvas.drawRightString(
        A4[0] - doc.rightMargin,
        A4[1] - doc.topMargin + 18,
        "Ruhe Global Resources  ·  Internal Correspondence",
    )
    canvas.setStrokeColor(TABLE_BORDER)
    canvas.setLineWidth(0.3)
    canvas.line(doc.leftMargin, doc.bottomMargin - 14,
                A4[0] - doc.rightMargin, doc.bottomMargin - 14)
    canvas.setFont("Carlito", 8.5)
    canvas.setFillColor(INK_SOFT)
    canvas.drawString(doc.leftMargin, doc.bottomMargin - 24,
                      "David — Findings & Role Alignment Memo")
    canvas.drawRightString(A4[0] - doc.rightMargin, doc.bottomMargin - 24,
                           f"Page {doc.page}")
    canvas.restoreState()


# ---------------------------------------------------------------------------
# 5. Custom flowable: shaded code block
# ---------------------------------------------------------------------------
class CodeBlock(Flowable):
    def __init__(self, text, width, font="DejaVuMono", font_size=9,
                 leading=12, padding=8):
        Flowable.__init__(self)
        self.text = text
        self.width = width
        self.font = font
        self.font_size = font_size
        self.leading = leading
        self.padding = padding
        self.lines = text.split("\n")
        self.height = (len(self.lines) * leading) + (2 * padding)

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return (self.width, self.height)

    def draw(self):
        c = self.canv
        c.setFillColor(CODE_BG)
        c.setStrokeColor(CODE_BG)
        c.roundRect(0, 0, self.width, self.height, 3, stroke=1, fill=1)
        c.setFillColor(CODE_FG)
        c.setFont(self.font, self.font_size)
        y = self.height - self.padding - self.font_size + 1
        for line in self.lines:
            c.drawString(self.padding, y, line)
            y -= self.leading


# ---------------------------------------------------------------------------
# 6. Build the story
# ---------------------------------------------------------------------------
def build_story():
    story = []

    # Letterhead
    story.append(Paragraph("Ruhe Global Resources", S["company"]))
    story.append(Paragraph("Internal Correspondence  ·  Engineering / HR", S["company_meta"]))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT,
                            spaceBefore=2, spaceAfter=10))

    # Meta block
    meta_rows = [
        [Paragraph("DATE", S["meta_label"]),
         Paragraph("15 September 2026", S["meta_value"])],
        [Paragraph("TO", S["meta_label"]),
         Paragraph("Mrs Georgian — Human Resources, Ruhe Global Resources", S["meta_value"])],
        [Paragraph("FROM", S["meta_label"]),
         Paragraph("David — Developer, Ruhe Global Resources", S["meta_value"])],
        [Paragraph("CC", S["meta_label"]),
         Paragraph("Mr Joseph — CEO (for awareness)", S["meta_value"])],
        [Paragraph("SUBJECT", S["meta_label"]),
         Paragraph("<b>Findings from audit of accommodationfinders.co.uk &amp; role alignment</b>",
                   S["meta_value"])],
    ]
    meta_table = Table(meta_rows, colWidths=[2.2 * cm, 14.0 * cm])
    meta_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -2), 0.25, colors.HexColor("#E2E8F0")),
        ("LINEBELOW", (0, -1), (-1, -1), 0.6, ACCENT),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # Salutation
    story.append(Paragraph("Dear Mrs Georgian,", S["body"]))

    # Opening paragraph
    story.append(Paragraph(
        "I'm writing to formally document findings from the technical audit I conducted on the "
        "Accommodation Finders website (https://accommodationfinders.co.uk/) which was handed to me "
        "today, and to request a conversation about how my role aligns with what was agreed during "
        "my interview with Mr Joseph.",
        S["body"]))

    # Section 1
    story.append(Paragraph("1. Context — what was agreed at interview", S["h2"]))
    story.append(Paragraph(
        "During my interview with Mr Joseph, I was asked to propose a solution for the current "
        "company website at https://ruhegr.com/. My recommendation was clear and is on record: "
        "build a <b>modern, fast and responsive</b> web platform using Next.js, with source control "
        "on GitHub and deployment via Vercel. That recommendation was accepted as the direction of "
        "travel, and it formed the basis of my joining Ruhe Global Resources.",
        S["body"]))
    story.append(Paragraph(
        "To date — one and a half weeks in — I have not been assigned to that work. I have instead "
        "been producing social media content, which I have gladly done and will continue to do, "
        "given my background in AI-assisted video generation. However, I understand that another "
        "developer, Ifeanyi, has since been brought onboard and is now executing the Next.js build "
        "I had originally scoped with Mr Joseph. I have no issue with Ifeanyi personally; I simply "
        "wish to flag the inconsistency.",
        S["body"]))
    story.append(Paragraph(
        "Today, I was instead handed a WordPress install (https://accommodationfinders.co.uk/) to "
        "develop further. I was left a little bit disappointed when I inquired if I could begin "
        "developing the website with my preferred tool stack and was met with a rejection. I want "
        "to be transparent: this is not work I am able to take on, and the reasons are technical, "
        "not preferential. I have documented them below.",
        S["body"]))

    # Section 2
    story.append(Paragraph("2. Findings from the audit of accommodationfinders.co.uk", S["h2"]))
    story.append(Paragraph(
        "I spent approximately thirty minutes auditing the live site. The findings are as follows.",
        S["body"]))

    # 2.1
    story.append(Paragraph("2.1  The site is live and serving real traffic while still under development", S["h3"]))
    story.append(Paragraph(
        "The site is publicly accessible at production URL with no staging environment, no preview "
        "deployment, and no access control. <b>This poses a significant security risk.</b> "
        "HTTP response on 15 September 2026:",
        S["body"]))

    code_text = (
        "HTTP/1.1 200 OK\n"
        "Server: Apache\n"
        "X-Powered-By: PHP/8.4.25\n"
        "Host: wghp5.wghservers.com (Secured Servers LLC, Virginia, US)"
    )
    story.append(CodeBlock(code_text, width=16 * cm))
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "This is the single most important finding. <b>A site that is under active development "
        "should not be receiving real production traffic.</b> Standard practice is to develop "
        "against a local or staging environment, deploy to a preview URL for review, and only "
        "promote to production once content, performance and security have been signed off. The "
        "current arrangement exposes unfinished work, internal structure and plugin fingerprints "
        "to the public — including potential attackers — throughout the entire development cycle.",
        S["body"]))

    # 2.2
    story.append(Paragraph("2.2  No version control, no CI/CD, no preview pipeline", S["h3"]))
    story.append(Paragraph(
        "There is no Git repository behind this site. Source code lives only on the production "
        "server's filesystem, and content lives in the MySQL database. Concretely, this means:",
        S["body"]))
    bullets_2_2 = [
        "There is no history of changes, so no audit trail of who changed what and when.",
        "There is no way to roll back to a known-good state other than restoring a database backup.",
        "There is no way to preview a change before it reaches live users — every save in Elementor is published instantly.",
        "There is no automated testing, no build verification, no deployment gate.",
    ]
    for b in bullets_2_2:
        story.append(Paragraph(f"• {b}", S["bullet"]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "For a business processing accommodation bookings (which involve personal data and "
        "payment-related flows), the absence of these safeguards is not a stylistic preference — "
        "it is a material risk.",
        S["body"]))

    # 2.3
    story.append(Paragraph("2.3  Stack fingerprint and plugin composition", S["h3"]))
    stack_rows = [
        ["Component", "Value"],
        ["CMS", "WordPress"],
        ["Page builder", "Elementor (visual drag-and-drop)"],
        ["Theme", "Hello Elementor (Elementor's starter theme)"],
        ["Booking engine", "MotoPress Hotel Booking Lite — free hotel plugin, repurposed for student housing"],
        ["Header / footer", "\u201cHeader Footer Builder for Elementor\u201d (third-party addon)"],
        ["Hosting", "Shared / VPS — Secured Servers LLC, Virginia"],
        ["PHP version", "8.4.25"],
        ["Analytics", "None detected — no GA4, no Meta Pixel, no Plausible"],
        ["Custom code", "Effectively zero — all functionality is plugin configuration stored in the database"],
    ]
    stack_table = Table(stack_rows, colWidths=[4.0 * cm, 12.2 * cm], repeatRows=1)
    stack_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), TABLE_HDR),
        ("TEXTCOLOR", (0, 0), (-1, 0), TABLE_HDR_F),
        ("FONTNAME", (0, 0), (-1, 0), "Carlito-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9.5),
        ("ALIGN", (0, 0), (-1, 0), "LEFT"),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("FONTNAME", (0, 1), (-1, -1), "BodySerif"),
        ("FONTSIZE", (0, 1), (-1, -1), 9.5),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 1), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PAPER, TABLE_ALT]),
        ("GRID", (0, 0), (-1, -1), 0.4, TABLE_BORDER),
        ("LINEBELOW", (0, 0), (-1, 0), 1.0, ACCENT),
    ]))
    story.append(stack_table)
    story.append(Spacer(1, 8))

    # 2.4
    story.append(Paragraph("2.4  Performance and payload", S["h3"]))
    story.append(Paragraph(
        "The homepage returns approximately 120 KB of HTML on every request, of which a "
        "significant proportion is inline &lt;style&gt; blocks generated by Elementor per page. "
        "Because there is no build step, this CSS is regenerated on each request and cannot "
        "benefit from a build-time optimisation pass. For comparison, a properly built Next.js "
        "application serving equivalent content typically returns 40–50 KB with code-split, "
        "tree-shaken, cached assets.",
        S["body"]))
    story.append(Paragraph(
        "There is also no edge caching, no CDN in front of the origin, and no image optimisation "
        "pipeline.",
        S["body"]))

    # 2.5
    story.append(Paragraph("2.5  Information exposure and security posture", S["h3"]))
    story.append(Paragraph("The site exposes, by default:", S["body"]))
    bullets_2_5 = [
        "WordPress version and plugin paths in page source (<font name='DejaVuMono' size='8.5'>/wp-content/plugins/elementor/...</font>)",
        "PHP version via the <b>X-Powered-By</b> header",
        "<font name='DejaVuMono' size='8.5'>wp-json</font> REST API endpoints at the public URL, which can be enumerated by anyone",
        "No <b>Content-Security-Policy</b>, no <b>Strict-Transport-Security</b> preload, no <b>X-Frame-Options: DENY</b>",
    ]
    for b in bullets_2_5:
        story.append(Paragraph(f"• {b}", S["bullet"]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Each of these is a low-severity issue in isolation, but together they describe a site "
        "that was deployed with default settings and never hardened. This is normal for WordPress "
        "installs; it is not normal for a production booking platform handling personal data.",
        S["body"]))

    # Section 3
    story.append(Paragraph("3. Why I am not able to take this work on", S["h2"]))
    story.append(Paragraph(
        "I want to be direct here, because I respect Mrs Georgian's time and Mr Joseph's original "
        "brief.",
        S["body"]))
    story.append(Paragraph(
        "WordPress development as a discipline is not aligned with my professional skills, and "
        "choosing it for a new build in 2026 would, in my honest assessment, not serve Ruhe Global "
        "Resources well. The reasons are concrete:",
        S["body"]))

    numbered_items = [
        ("<b>It is not what I was hired to do.</b> The brief at interview was Next.js + GitHub + "
         "Vercel. I have not deviated from that brief; the project has."),
        ("<b>The toolchain does not support the engineering practices I consider non-negotiable</b> "
         "— typed code, AI-assisted development, version control, automated testing, preview "
         "environments, atomic deployments, observability. WordPress as a platform does not "
         "provide these by default and retrofitting them is more work than rebuilding."),
        ("<b>It is not the right tool for a booking platform handling personal data and payments.</b> "
         "The free MotoPress hotel plugin being used here is not designed for the regulatory and "
         "security requirements of UK student accommodation. A custom Next.js application with a "
         "properly typed backend gives the business control over data handling, audit logging, and "
         "compliance posture — which WordPress-with-plugins does not."),
        ("<b>Total cost of ownership is higher, not lower.</b> A WordPress site looks cheap to stand "
         "up, but the long-term cost — plugin subscriptions, security patching, recovery from "
         "incidents, developer onboarding for a stack that has no version control — is materially "
         "higher than a properly built custom application. I would be doing the company a disservice "
         "to pretend otherwise."),
    ]
    for i, item in enumerate(numbered_items, 1):
        story.append(Paragraph(f"{i}. {item}", S["num"]))

    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "For context on what I am building day-to-day in the tool stack I do work in: I began "
        "developing https://pitchcoachai.tech/ over the weekend out of a personal interest in "
        "integrating chatbots and AI agents into platforms. It is an AI pitch-coaching application "
        "built on Next.js, deployed on Vercel, with Clerk for authentication and Z.ai / Gemini "
        "for the language model layer. It is still in active development — the security layer "
        "does not yet let users past the sign-up page — but it is a small, representative example "
        "of the kind of platform I am equipped to ship, and this is the standard in 2026.",
        S["body"]))

    # Section 4
    story.append(Paragraph("4. What I am asking for", S["h2"]))
    story.append(Paragraph(
        "I am not asking to be relieved of duties. I am asking for clarity on the following:",
        S["body"]))

    asks = [
        ("Is the Accommodation Finders project being handed to me to develop? If so, I would like "
         "to discuss whether a rebuild in the originally agreed stack is possible, rather than "
         "continuing to extend the current WordPress install."),
        ("If not, what is the intended scope of my role for the remainder of my probation? I am "
         "happy to continue content work in the interim, but I would like it on record that this "
         "is not the work I was hired to do."),
        ("If there are other web development opportunities within the company, or within partner "
         "and client relations, I would gladly take these on — as a caveat, it was clearly stated "
         "in the job description and offer letter I received from the organisation that this kind "
         "of work falls within my remit. I would also welcome the opportunity to contribute to the "
         "Next.js work that Ifeanyi is leading; I would prefer collaboration over displacement."),
    ]
    for i, ask in enumerate(asks, 1):
        story.append(Paragraph(f"{i}. {ask}", S["num"]))

    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "I came to Ruhe Global Resources to be challenged and to do serious work. I am confident I "
        "can deliver against the original brief, and I would welcome the opportunity to do so. I "
        "am available to walk through any of the technical points above at your convenience.",
        S["body"]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("Thank you for your time.", S["body"]))
    story.append(Spacer(1, 18))

    # Signature
    story.append(HRFlowable(width="35%", thickness=0.5, color=INK_SOFT,
                             spaceBefore=0, spaceAfter=4, hAlign="LEFT"))
    story.append(Paragraph("Kind regards,", S["sig"]))
    story.append(Spacer(1, 14))
    story.append(Paragraph("<b>David</b>", S["sig"]))
    story.append(Paragraph("Developer", S["sig"]))
    story.append(Paragraph("Ruhe Global Resources", S["sig"]))

    return story


# ---------------------------------------------------------------------------
# 7. Build the PDF
# ---------------------------------------------------------------------------
OUTPUT_PATH = "/home/z/my-project/download/email_to_hr_georgian.pdf"
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    leftMargin=2.0 * cm,
    rightMargin=2.0 * cm,
    topMargin=2.2 * cm,
    bottomMargin=2.0 * cm,
    title="Findings from audit of accommodationfinders.co.uk + role alignment",
    author="David",
    subject="Internal correspondence — Ruhe Global Resources",
    creator="Z.ai",
)

doc.build(build_story(), onFirstPage=on_page, onLaterPages=on_page)

size = os.path.getsize(OUTPUT_PATH)
print(f"PDF generated: {OUTPUT_PATH}")
print(f"Size: {size/1024:.1f} KB")
