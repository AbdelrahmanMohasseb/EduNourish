const fs = require("fs");
const PDFDocument = require("pdfkit");

// Updated PDF generation function
const createPDF = (data, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    });

    doc.pipe(fs.createWriteStream(filePath));

    // Define colors matching the design
    const colors = {
      primaryBlue: '#2E4F7F',
      lightBlue: '#4A6FA5',
      lightGray: '#F5F5F5',
      white: '#FFFFFF',
      text: '#333333',
      border: '#CCCCCC'
    };

    let yPosition = 20;

    // Header Section
    doc.fillColor(colors.primaryBlue)
       .rect(20, yPosition, doc.page.width - 40, 60)
       .fill();

    doc.fillColor(colors.white)
       .fontSize(18)
       .font('Helvetica-Bold')
       .text("University Recommendation Report", 0, yPosition + 15, { align: "center" });

    doc.fontSize(12)
       .font('Helvetica')
       .text(`Student Name: ${data.studentName} | Date: ${new Date().toLocaleDateString('en-US', { 
         year: 'numeric', 
         month: '2-digit', 
         day: '2-digit' 
       })}`, 0, yPosition + 40, { align: "center" });

    yPosition += 80;

    // Academic Profile Summary Section
    doc.fillColor(colors.primaryBlue)
       .rect(20, yPosition, doc.page.width - 40, 25)
       .fill();

    doc.fillColor(colors.white)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text("Academic Profile Summary", 30, yPosition + 8);

    yPosition += 35;

    // Academic Strengths Table Header
    const tableStartY = yPosition;
    const tableWidth = doc.page.width - 40;
    const subjectColWidth = tableWidth / 2;
    const gradeColWidth = tableWidth / 2;

    // Table header
    doc.fillColor(colors.primaryBlue)
       .rect(20, yPosition, tableWidth, 25)
       .fill();

    doc.fillColor(colors.white)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text("Subject", 30, yPosition + 8)
       .text("Grade", 20 + subjectColWidth + 10, yPosition + 8, { align: "center" });

    yPosition += 25;

    // Table rows
    data.academic_strengths.forEach((strength, index) => {
      const rowColor = index % 2 === 0 ? colors.white : colors.lightGray;
      
      doc.fillColor(rowColor)
         .rect(20, yPosition, tableWidth, 20)
         .fill();

      // Draw borders
      doc.strokeColor(colors.border)
         .lineWidth(0.5)
         .rect(20, yPosition, tableWidth, 20)
         .stroke();

      doc.fillColor(colors.text)
         .fontSize(11)
         .font('Helvetica')
         .text(strength.Subject, 30, yPosition + 6)
         .text(strength.Grade.toString(), 20 + subjectColWidth + 10, yPosition + 6, { align: "center" });

      yPosition += 20;
    });

    yPosition += 20;

    // Program Matches Section - showing all programs
    if (data.top_recommendations.length > 0) {
      doc.fillColor(colors.primaryBlue)
         .rect(20, yPosition, doc.page.width - 40, 25)
         .fill();

      doc.fillColor(colors.white)
         .fontSize(14)
         .font('Helvetica-Bold')
         .text("Program Matches", 30, yPosition + 8);

      yPosition += 35;

      // Program table header
      doc.fillColor(colors.primaryBlue)
         .rect(20, yPosition, tableWidth, 25)
         .fill();

      const programColWidth = tableWidth / 4;
      doc.fillColor(colors.white)
         .fontSize(11)
         .font('Helvetica-Bold')
         .text("Program", 30, yPosition + 8)
         .text("Success Probability", 20 + programColWidth * 3 + 10, yPosition + 8, { align: "center" });

      yPosition += 25;

      // Program data rows - loop through all programs
      data.top_recommendations.forEach((program, index) => {
        const rowColor = index % 2 === 0 ? colors.white : colors.lightGray;
        
        doc.fillColor(rowColor)
           .rect(20, yPosition, tableWidth, 20)
           .fill();

        doc.strokeColor(colors.border)
           .lineWidth(0.5)
           .rect(20, yPosition, tableWidth, 20)
           .stroke();

        const successPercentage = Math.round(program.success_probability * 100);
        // Generate dynamic raw scores based on success probability
        const rawScore = Math.max(60, Math.round(program.success_probability * 100 - 10));
        const refinedScore = Math.max(65, Math.round(program.success_probability * 100 - 5));
        
        doc.fillColor(colors.text)
           .fontSize(11)
           .font('Helvetica')
           .text(program.program, 30, yPosition + 6)
           .text(`${successPercentage}%`, 20 + programColWidth * 3 + 10, yPosition + 6, { align: "center" });

        yPosition += 20;
      });

      yPosition += 20;
    }

    // University Recommendations Section
    doc.fillColor(colors.primaryBlue)
       .rect(20, yPosition, doc.page.width - 40, 25)
       .fill();

    doc.fillColor(colors.white)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text("University Recommendations", 30, yPosition + 8);

    yPosition += 35;

    // University recommendations
    data.top_recommendations.forEach((recommendation, index) => {
      if (yPosition > doc.page.height - 150) {
        doc.addPage();
        yPosition = 20;
      }

      // University name as header
      const universityName = recommendation.recommended_universities[0] ? 
        recommendation.recommended_universities[0].split(' - ')[0] : 
        `Top University for ${recommendation.program}`;

      doc.fillColor(colors.text)
         .fontSize(14)
         .font('Helvetica-Bold')
         .text(universityName, 30, yPosition);

      yPosition += 20;

      // Program info
      doc.fontSize(12)
         .font('Helvetica')
         .text(`Program: ${recommendation.program}`, 30, yPosition);

      yPosition += 15;

      // Score and success rate
      const successPercentage = Math.round(recommendation.success_probability * 100);
      doc.text(`Score: 80% (Refined) | Success: ${successPercentage}%`, 30, yPosition);

      yPosition += 15;

      // Departments
      doc.text("Departments:", 30, yPosition);
      yPosition += 15;

      recommendation.recommended_departments.forEach(dept => {
        doc.text(`• ${dept}`, 40, yPosition);
        yPosition += 12;
      });

      yPosition += 15;

      // Add separator line if not last item
      if (index < data.top_recommendations.length - 1) {
        doc.strokeColor(colors.border)
           .lineWidth(1)
           .moveTo(30, yPosition)
           .lineTo(doc.page.width - 30, yPosition)
           .stroke();
        yPosition += 20;
      }
    });

    // Footer
    const footerY = doc.page.height - 30;
    doc.fillColor('#666666')
       .fontSize(10)
       .font('Helvetica')
       .text('© 2025 Student Recommendation System. All Rights Reserved.',
             0, footerY, { align: 'center' });

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