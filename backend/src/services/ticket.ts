import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

interface TicketData {
  ticketNumber: string;
  qrToken: string;
  workshopTitle: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  mentorName: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  venue: string;
  amountPaid: number;
  verificationUrl: string;
}

export async function generateTicketPDF(ticketData: TicketData, outputPath?: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A5',
        layout: 'landscape',
        margin: 30
      });

      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        if (outputPath) {
          const dir = path.dirname(outputPath);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(outputPath, pdfBuffer);
        }
        resolve(pdfBuffer);
      });

      // Generate QR Code as DataURL / Buffer
      const qrDataUrl = await QRCode.toDataURL(ticketData.verificationUrl, {
        margin: 1,
        width: 140,
        color: {
          dark: '#08090C',
          light: '#FFFFFF'
        }
      });
      const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, '');
      const qrBuffer = Buffer.from(qrBase64, 'base64');

      // Outer Background (Cinematic Dark #0B0D12)
      doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0B0D12');

      // Inner Ticket Card (#13161F with gold border)
      const pad = 18;
      const cardW = doc.page.width - pad * 2;
      const cardH = doc.page.height - pad * 2;
      doc.roundedRect(pad, pad, cardW, cardH, 8).fill('#13161F');
      doc.roundedRect(pad, pad, cardW, cardH, 8).lineWidth(1.5).stroke('#C9A45C');

      // Top Header Strip (#191D28)
      doc.roundedRect(pad, pad, cardW, 50, 8).fill('#1A1E29');
      // Red Clapperboard Icon representation
      doc.rect(pad + 16, pad + 14, 22, 22).fill('#B71C1C');
      doc.fillColor('#FFFFFF').fontSize(14).font('Helvetica-Bold')
         .text('MACTS', pad + 46, pad + 12);
      doc.fillColor('#C9A45C').fontSize(7.5).font('Helvetica')
         .text('MOONINRED ACADEMY OF CINEMA TECHNICAL STUDIES', pad + 46, pad + 28);

      doc.fillColor('#E8D6A8').fontSize(9).font('Helvetica-Bold')
         .text('OFFICIAL WORKSHOP ADMISSION PASS', cardW - 190, pad + 18, { align: 'right' });
      doc.fillColor('#A5A7AD').fontSize(7.5).font('Helvetica')
         .text(`PASS ID: ${ticketData.ticketNumber}`, cardW - 190, pad + 30, { align: 'right' });

      // Left Column - Details
      const leftX = pad + 20;
      let curY = pad + 65;

      // Workshop Title
      doc.fillColor('#E8D6A8').fontSize(8).font('Helvetica-Bold').text('WORKSHOP EVENT', leftX, curY);
      curY += 12;
      doc.fillColor('#FFFFFF').fontSize(13).font('Helvetica-Bold').text(ticketData.workshopTitle, leftX, curY, { width: 340 });
      curY += 28;

      // Participant Name
      doc.fillColor('#A5A7AD').fontSize(7.5).font('Helvetica').text('PARTICIPANT NAME', leftX, curY);
      doc.fillColor('#A5A7AD').fontSize(7.5).font('Helvetica').text('MENTOR / INSTRUCTOR', leftX + 180, curY);
      curY += 10;
      doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(ticketData.participantName, leftX, curY, { width: 170 });
      doc.fillColor('#C9A45C').fontSize(10).font('Helvetica-Bold').text(ticketData.mentorName, leftX + 180, curY, { width: 170 });
      curY += 24;

      // Date & Time
      doc.fillColor('#A5A7AD').fontSize(7.5).font('Helvetica').text('DATE & TIME', leftX, curY);
      doc.fillColor('#A5A7AD').fontSize(7.5).font('Helvetica').text('VENUE / LOCATION', leftX + 180, curY);
      curY += 10;
      const timeStr = ticketData.endTime ? `${ticketData.startTime} - ${ticketData.endTime}` : ticketData.startTime;
      doc.fillColor('#FFFFFF').fontSize(9.5).font('Helvetica-Bold').text(`${ticketData.eventDate} | ${timeStr}`, leftX, curY, { width: 170 });
      doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica').text(ticketData.venue, leftX + 180, curY, { width: 170 });
      curY += 26;

      // Status pill & Fee
      doc.roundedRect(leftX, curY, 90, 20, 4).fill('#0F3D24');
      doc.fillColor('#4ADE80').fontSize(8).font('Helvetica-Bold').text('VERIFIED & PAID', leftX + 10, curY + 6);
      doc.fillColor('#E8D6A8').fontSize(9).font('Helvetica').text(`Fee Paid: INR ${ticketData.amountPaid}`, leftX + 105, curY + 6);

      // Vertical Divider before QR Stub
      const stubX = doc.page.width - pad - 145;
      doc.moveTo(stubX, pad + 52).lineTo(stubX, doc.page.height - pad - 26)
         .lineWidth(1).dash(4, { space: 4 }).stroke('#30323A');
      doc.undash();

      // Right Column - QR Code & Verification Stub
      const qrX = stubX + 12;
      const qrY = pad + 65;
      // White box for QR code for high scanner contrast
      doc.roundedRect(qrX, qrY, 120, 120, 6).fill('#FFFFFF');
      doc.image(qrBuffer, qrX + 5, qrY + 5, { width: 110, height: 110 });

      doc.fillColor('#C9A45C').fontSize(7.5).font('Helvetica-Bold')
         .text('SCAN TO VERIFY PASS', qrX, qrY + 126, { width: 120, align: 'center' });
      doc.fillColor('#A5A7AD').fontSize(6.5).font('Helvetica')
         .text('Present this pass at venue check-in.', qrX, qrY + 138, { width: 120, align: 'center' });

      // Bottom Footer Bar
      const btmY = doc.page.height - pad - 24;
      doc.fillColor('#6A6D76').fontSize(7).font('Helvetica')
         .text('MoonInRed Academy of Cinema Technical Studies  |  Support: +91 88700 32122  |  mactsofficial@gmail.com', leftX, btmY);
      doc.fillColor('#8B1E1E').fontSize(7).font('Helvetica-Bold')
         .text('https://mactsfilminstitute.com', cardW - 120, btmY, { align: 'right' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

