const sequelize = require('./DB/config/connectDB');

const student = require('./DB/models/student');

async function resetstudentTable() {
    try {
        await student.drop(); // حذف الجدول فقط
        await student.sync({ force: true }); // إعادة إنشائه من الموديل
        console.log('✅ studentexam table has been reset.');
    } catch (err) {
        console.error('❌ Error resetting studentexam table:', err);
    } finally {
        await sequelize.close(); // إغلاق الاتصال
    }
}

resetstudentTable();