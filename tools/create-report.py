"""Generate the two-page academic report using ReportLab (development only)."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.utils import simpleSplit
from pypdf import PdfReader

OUT = Path('docs/CMPS510_Portfolio_Short_Report.pdf')
OUT.parent.mkdir(exist_ok=True)
c = canvas.Canvas(str(OUT), pagesize=(612,792))
c.setTitle('CMPS 510 - Personal Portfolio Page: Software Engineering Project Report')
c.setAuthor('Gowtham Kanneganti')
INK = HexColor('#222d28'); MUTED = HexColor('#59665d'); ORANGE = HexColor('#b83e19'); LINE = HexColor('#d7dbd1')
W = 508

def text(x,y,value,size=10,color=INK,font='Helvetica'):
    c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,value)

def paragraph(value,y,width=W,size=10,leading=15,x=52,color=INK):
    for line in simpleSplit(value,'Helvetica',size,width):
        text(x,y,line,size,color);y-=leading
    return y

def heading(number,title,y):
    text(52,y,number,10,ORANGE,'Helvetica-Bold');text(79,y,title,15,INK,'Helvetica-Bold')
    return y-27

def frame(page):
    c.setFillColor(HexColor('#f7f7f1'));c.rect(0,0,612,792,fill=1,stroke=0)
    text(52,754,'GK / ENGINEERING PORTFOLIO',9,ORANGE,'Helvetica-Bold')
    text(430,754,'CMPS 510 / FALL 2026',8,MUTED)
    c.setStrokeColor(LINE);c.line(52,737,560,737);c.line(52,48,560,48)
    text(52,32,'Gowtham Kanneganti | Prepared November 10, 2026',8,MUTED)
    text(512,32,f'{page} / 2',8,MUTED)

frame(1)
text(52,704,'CMPS 510 - Personal Portfolio Page:',23,INK,'Helvetica-Bold')
text(52,678,'Software Engineering Project Report',17,INK)
text(52,653,'CMPS 510 - Principles and Concepts of Software Engineering',10,MUTED)
text(52,628,'Gowtham Kanneganti',12,INK,'Helvetica-Bold')
text(52,610,'Bay Atlantic University | Instructor: Dr. Tsige Tessema',10,MUTED)
y=heading('01','Project overview',568)
y=paragraph('Project 7 is a responsive professional portfolio for a Robotics & AI Engineer. It presents supplied education, technical skills, a verified software-project description, and two engineering-experience summaries. Recruiters can explore the work and access GitHub, LinkedIn, and direct email links.',y)
y=paragraph('The application is a static HTML, CSS, and JavaScript page. It has no application server, database, authentication, or message delivery service. The demonstration form validates inputs and displays a truthful thank-you message. Only the theme preference is stored.',y-10)
y=heading('02','Five core user stories & acceptance criteria',y-28)
stories=[
('1. Professional background','As a recruiter, I want to view the engineer\'s professional background so that I can assess relevance to a robotics role.','About shows the supplied background and all three education entries; the temporary portrait is visible and clearly labeled.'),
('2. Projects and experience','As a hiring manager, I want to explore projects and engineering experience so that I can understand the engineer\'s practical focus.','Three cards are visible. MaintainAI links to its real repository; the other cards are explicitly labeled as experience.'),
('3. Professional contact','As a collaborator, I want to access professional contact links so that I can start a real conversation.','GitHub and LinkedIn use the supplied URLs; the direct email link uses the supplied Outlook mailto address.'),
('4. Demonstration form','As a visitor, I want to submit the demonstration contact form so that I can see clear feedback.','Blank fields and invalid email show field feedback. Valid input shows thanks and states that nothing was sent or stored.'),
('5. Theme preference','As a visitor, I want to change between light and dark themes so that I can read in my preferred appearance.','The toggle changes the theme and accessible label; the choice survives reload when storage is available.')]
for title,story,ac in stories:
    text(52,y,title,10,ORANGE,'Helvetica-Bold');y-=16
    y=paragraph(story,y,size=9,leading=12)
    y=paragraph('Acceptance: '+ac,y-3,size=8.5,leading=11,color=MUTED)
    y-=13
assert y>58, f'Page 1 overflow: {y}'
c.showPage();frame(2)
y=heading('03','Application layout sketch',704)
text(52,y,'Wireframe prepared during implementation; matches the final section order.',9,MUTED)
y-=20
def box(x,y,w,h,label,sub=None):
    c.setFillColor(HexColor('#eeefe7'));c.setStrokeColor(LINE);c.roundRect(x,y,w,h,4,fill=1,stroke=1)
    text(x+12,y+h-18,label,10,INK,'Helvetica-Bold')
    if sub: text(x+12,y+10,sub,8,MUTED)

box(52,601,W,43,'Header','Wordmark | About / Work / Skills / Contact | Theme toggle')
box(52,524,248,66,'Hero: introduction & links','Name, role, work / contact actions')
box(312,524,248,66,'Engineering illustration','Conceptual robotic arm')
box(52,451,W,62,'About + portrait placeholder','Background, engineering focus, and three education entries')
for x,w,label,sub in [(52,162,'MaintainAI','Software project'),(225,162,'Server disassembly','Engineering experience'),(398,162,'Vision & inspection','Technical experience')]:box(x,382,w,58,label,sub)
box(52,324,W,47,'Technical skills','Robotics | Automation | Software | Vision & AI')
box(52,256,248,57,'Contact links','Email | GitHub | LinkedIn')
box(312,256,248,57,'Demonstration form','Name | Email | Message | Feedback')
box(52,211,W,34,'Footer: name, links, copyright')
text(52,194,'Mobile: columns stack; navigation remains visible; section order is preserved.',8,MUTED)
y=heading('04','Implementation & verification',177)
y=paragraph('Built locally on Windows in Codex Desktop. Semantic HTML, responsive CSS, pure validation/theme utilities, and DOM interaction code separate responsibilities. Node tooling validates and assembles the static site.',y,size=9,leading=12)
y=paragraph('Executed: 22 unit tests and 13 Chrome checks passed; HTML/assets validated. Browser coverage includes forms, themes, keyboard access, reduced motion, mobile overflow and axe in both themes. Automated scans do not prove full accessibility.',y-5,size=8.5,leading=11)
y=paragraph('Codex assisted with design, code, tests and documentation. A real photo and student review remain required. Deployment evidence: CHECKPOINT_SUMMARY.md.',y-5,size=8.5,leading=11,color=MUTED)
assert y>55, f'Page 2 overflow: {y}'
c.save()
reader=PdfReader(OUT)
assert len(reader.pages)==2
alltext='\n'.join(p.extract_text() for p in reader.pages)
assert alltext.count('As a ')==5
print(f'Generated {OUT}: 2 pages; exactly 5 user stories.')
