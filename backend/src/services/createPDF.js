const fs = require("fs");
const PDFDocument = require("pdfkit");

  const createPDF = (data, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 28.35,
        bottom: 28.35,
        left: 28.35,
        right: 28.35
      }
    });
    
    doc.pipe(fs.createWriteStream(filePath));
    
    // Define colors from HTML template
    const colors = {
      primary: '#1e3c72',
      secondary: '#2a5298',
      background: '#eaf1f8',
      white: '#ffffff',
      text: '#333333'
    };
    
    // Header with blue background
    doc.fillColor(colors.primary)
       .rect(0, 0, doc.page.width, 60)
       .fill();
    
    doc.fillColor(colors.white)
       .fontSize(20)
       .font('Helvetica-Bold')
       .text("Student Performance Report", 0, 20, { align: "center" });
    
    // Move down after header
    let yPosition = 80;
    doc.fillColor(colors.text);
    
    // Best Grades Section with styled header
    doc.fillColor(colors.secondary)
       .rect(28.35, yPosition, doc.page.width - 56.7, 20)
       .fill();
    
    doc.fillColor(colors.white)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text("Best Grades in Subjects:", 38.35, yPosition + 6);
    
    yPosition += 35;
    
    // Best Grades content
    doc.fillColor(colors.text)
       .fontSize(12)
       .font('Helvetica');
    
    data.bestGrades.forEach(grade => {
    //   doc.text(${grade.subject}: ${grade.grade}, 38.35, yPosition);
      yPosition += 20;
    });
    
    yPosition += 15;
    
    // Top Universities Section with styled header
    doc.fillColor(colors.secondary)
       .rect(28.35, yPosition, doc.page.width - 56.7, 20)
       .fill();
    
    doc.fillColor(colors.white)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text("Top Recommended Universities:", 38.35, yPosition + 6);
    
    yPosition += 35;
    
    // Universities content
    doc.fillColor(colors.text)
       .fontSize(12)
       .font('Helvetica');
    
    data.bestUniversities.forEach(university => {
    //   doc.text(- ${university}, 38.35, yPosition);
      yPosition += 20;
    });
    
    // Footer
    const footerY = doc.page.height - 40;
    doc.strokeColor('#cccccc')
       .moveTo(28.35, footerY)
       .lineTo(doc.page.width - 28.35, footerY)
       .stroke();
    
    doc.fillColor('#666666')
       .fontSize(10)
       .font('Helvetica')
       .text('© 2025 Student Recommendation System. All Rights Reserved.', 
             0, footerY + 10, { align: 'center' });
    
    doc.end();
    doc.on("finish", () => resolve());
    doc.on("error", err => reject(err));
  });
};

// Usage: createPDF(sampleData, 'university-report.pdf');

// const createPDF = (data, filePath) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();

//     doc.pipe(fs.createWriteStream(filePath));

//     doc.fontSize(20).text("Student Performance Report", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(14).text("Best Grades in Subjects:", { underline: true });
//     data.bestGrades.forEach(grade => {
//       doc.text(`${grade.subject}: ${grade.grade}`);
//     });

//     doc.moveDown();
//     doc.fontSize(14).text("Top Recommended Universities:", { underline: true });
//     data.bestUniversities.forEach(university => {
//       doc.text(`- ${university}`);
//     });

//     doc.end();

//     doc.on("finish", () => resolve());
//     doc.on("error", err => reject(err));
//   });
// };

module.exports = createPDF;




// const fs = require("fs");
// const PDFDocument = require("pdfkit");

// function createInvoice(invoice, path) {
//     let doc = new PDFDocument({ size: "A4", margin: 50 });

//     generateHeader(doc);
//     generateCustomerInformation(doc, invoice);
//     generateInvoiceTable(doc, invoice);
//     generateFooter(doc);

//     doc.end();
//     doc.pipe(fs.createWriteStream(path));
// }

// function generateHeader(doc) {
//     doc
//         .image("logo.png", 60, 80, { width: 50 })
//         .fillColor("red")
//         .fontSize(50)
//         .text("Route Acadmey", 200, 70)
//         .fontSize(10)
//         .text("ACME Inc.", 200, 50, { align: "right" })
//         .text("123 Main Street", 200, 65, { align: "right" })
//         .text("New York, NY, 10025", 200, 80, { align: "right" })
//         .moveDown();
// }

// function generateCustomerInformation(doc, invoice) {
//     doc
//         .fillColor("#444444")
//         .fontSize(20)
//         .text(invoice[0].userName, 50, 160);
//     generateHr(doc, 185);

//     const customerInformationTop = 200;

//     doc
//         .fontSize(10)
//         .text("firstName", 50, customerInformationTop)
//         .font("Helvetica-Bold")
//         .text(invoice[0].firstName, 150, customerInformationTop)
//         .font("Helvetica")
//         .text("Invoice Date:", 50, customerInformationTop + 15)
//         .text(formatDate(new Date()), 150, customerInformationTop + 15)
//         .text("email", 50, customerInformationTop + 30)
//         .text(
//             invoice[0].email, 150,
//             customerInformationTop + 30
//         )

//     generateHr(doc, 252);
// }

// function generateInvoiceTable(doc, invoice) {
//     let i;
//     const invoiceTableTop = 330;

//     doc.font("Helvetica-Bold");
//     generateTableRow(
//         doc,
//         invoiceTableTop,
//         "userName",
//         "Email",
//         "gender",
//         "confirmed"
//     );
//     generateHr(doc, invoiceTableTop + 20);
//     doc.font("Helvetica");

//     for (i = 0; i < invoice.length; i++) {
//         const item = invoice[i];
//         const position = invoiceTableTop + (i + 1) * 30;
//         generateTableRow(
//             doc,
//             position,
//             item.userName,
//             item.email,
//             item.gender,
//             item.confirmed,

//         );

//         generateHr(doc, position + 20);
//     }
//     doc.font("Helvetica");
// }

// function generateFooter(doc) {
//     doc
//         .fontSize(10)
//         .text(
//             "Payment is due within 15 days. Thank you for your business.",
//             50,
//             780, { align: "center", width: 500 }
//         );
// }

// function generateTableRow(
//     doc,
//     y,
//     item,
//     description,
//     unitCost,
//     quantity,
//     lineTotal
// ) {
//     doc
//         .fontSize(10)
//         .text(item, 50, y)
//         .text(description, 150, y)
//         .text(unitCost, 280, y, { width: 90, align: "right" })
//         .text(quantity, 370, y, { width: 90, align: "right" })
//         .text(lineTotal, 0, y, { align: "right" });
// }

// function generateHr(doc, y) {
//     doc
//         .strokeColor("red")
//         .lineWidth(1)
//         .moveTo(50, y)
//         .lineTo(550, y)
//         .stroke();
// }

// function formatCurrency(cents) {
//     return "$" + (cents / 100).toFixed(2);
// }

// function formatDate(date) {
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();

//     return year + "/" + month + "/" + day;
// }

// module.exports = {
//     createInvoice
// };