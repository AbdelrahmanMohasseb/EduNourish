
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".main-nav li");

    if (navItems.length === 0) return;

    // تحديد العنصر النشط بناءً على الصفحة الحالية
    function setActiveItem() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach((item, index) => {
            const link = item.querySelector("a");
            if (link) {
                const href = link.getAttribute('href').split('/').pop();
                if (href === currentPath) {
                    navItems.forEach(el => el.classList.remove("active"));
                    item.classList.add("active");
                    localStorage.setItem("activeNavIndex", index);
                    return;
                }
            }
        });
    }

    // التفعيل الأولي عند تحميل الصفحة
    setActiveItem();

    // معالجة النقر على عناصر القائمة
    navItems.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const link = this.querySelector("a");
            if (link) {
                window.location.replace(link.href);
            }
        });
    });

    // تحديث المؤشر عند استخدام زر الرجوع في المتصفح
    window.addEventListener('popstate', setActiveItem);
});

document.getElementById('login-link').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginModal').style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target == document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
});

document.getElementById("loginButton").addEventListener("click", async () => {
    const idInput = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!idInput || !password) {
        showToast("Please enter the ID number and password.", "warning");
        return;
    }

    try {
        const response = await fetch("http://54.242.19.19:3000/api/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idInput, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // ✅ عرض رسالة النجاح
            showToast("Logged in successfully.", "success");

            // ✅ خزّن البيانات
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            const userIdToStore = data.id || idInput;
            localStorage.setItem("userID", userIdToStore);
            localStorage.setItem("role", data.role);

            document.getElementById("loginModal").style.display = "none";

            // ✅ نأخر التوجيه 1.5 ثانية علشان التوست يبان
            setTimeout(() => {
                switch (data.role) {
                    case 'student':
                        window.location.href = "/student/HomeStudent.html";
                        break;
                    case 'teacher':
                        window.location.href = "/Teacher/HomeTeacher.html";
                        break;
                    case 'advisor':
                        window.location.href = "/advisor/HomeAdvisor.html";
                        break;
                    case 'organizer':
                        window.location.href = "/Organization/HomeOrganization.html";
                        break;
                    case 'parent':
                        window.location.href = "/Parent/HomePerent.html";
                        break;
                    default:
                        showToast("The type of user is unknown.", "error");
                }
            }, 1500); // ⏱️ وقت التوست قبل التحويل
        } else {
            showToast(data.message || "The number or password is incorrect.", "error");
        }
    } catch (error) {
        console.error("Connection error:", error);
        showToast("An error occurred while connecting to the server. Please try again later.", "warning");
    }
});
 function showToast(message, type = "default") {
      const toast = document.getElementById("toast");

      toast.className = "toast-message";

      if (["success", "error", "warning"].includes(type)) {
          toast.classList.add(type);
      }

      let icon = "";
      switch (type) {
          case "success": icon = "✅"; break;
          case "error": icon = "❌"; break;
          case "warning": icon = "⚠️"; break;
          default: icon = "🔔";
      }

      toast.innerHTML = `<span>${icon}</span> ${message}`;
      toast.classList.add("show");

      setTimeout(() => {
          toast.classList.remove("show");
      }, 4000);
  }

  window.addEventListener("DOMContentLoaded", () => {
      const toastData = localStorage.getItem("toastMessage");
      if (toastData) {
          const { text, type } = JSON.parse(toastData);
          showToast(text, type);
          localStorage.removeItem("toastMessage");
      }
  });


document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "none";
}); 
document.addEventListener('DOMContentLoaded', function() {
    // اختيار العناصر المطلوبة
    const menuLink = document.querySelector('.menu-link');
    const menu = document.getElementById('menu');
    
    // إضافة حدث النقر لأيقونة القائمة
    if(menuLink && menu) {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // تبديل حالة القائمة (فتح/إغلاق)
            if(menu.classList.contains('active')) {
                menu.classList.remove('active');
                menu.style.maxHeight = '0';
            } else {
                menu.classList.add('active');
                menu.style.maxHeight = menu.scrollHeight + 'px';
            }
        });
        
        // إغلاق القائمة عند النقر على أي عنصر فيها (اختياري)
        const menuItems = menu.querySelectorAll('.main-menu li a'); // تم تعديل selector
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if(window.innerWidth < 950) {
                    menu.classList.remove('active');
                    menu.style.maxHeight = '0';
                }
            });
        });
    }
});
