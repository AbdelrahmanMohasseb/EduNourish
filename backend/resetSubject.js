
//// ملف بيعمل reset لجدول معين 


const sequelize = require('./DB/config/connectDB');

const attendance = require('./DB/models/attendance');

async function resetattendanceTable() {
    try {
        await attendance.drop(); // حذف الجدول فقط
        await attendance.sync({ force: true }); // إعادة إنشائه من الموديل
        console.log('✅ attendance table has been reset.');
    } catch (err) {
        console.error('❌ Error resetting attendance table:', err);
    } finally {
        await sequelize.close(); // إغلاق الاتصال
    }
}

resetattendanceTable();