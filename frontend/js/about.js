document.addEventListener("DOMContentLoaded", function () {
    function animateCounter(el, start, end, duration) {
        let startTime = null;
        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = Math.min((currentTime - startTime) / duration, 1);
            el.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    function startCounting(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let counter = entry.target;
                let endValue = parseInt(counter.textContent, 10);
                animateCounter(counter, 0, endValue, 2000);
                observer.unobserve(counter); // إيقاف المراقبة بعد التشغيل لمرة واحدة
            }
        });
    }

    let options = { threshold: 0.5 }; // تشغيل العد عند ظهور 50% من العنصر
    let observer = new IntersectionObserver(startCounting, options);

    document.querySelectorAll(".counter").forEach(counter => {
        observer.observe(counter);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.textimonial_iner.owl-carousel');

    if (carousel) {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.owl-item:not(.cloned)');
        const totalItems = items.length;

        function rotateCarousel() {
            currentIndex = (currentIndex + 1) % totalItems;

            const itemWidth = items[0].offsetWidth;
            const offset = -currentIndex * itemWidth;

            const stage = carousel.querySelector('.owl-stage');
            if (stage) {
                stage.style.transition = 'transform 0.5s ease'; // حركة ناعمة
                stage.style.transform = `translate3d(${offset}px, 0px, 0px)`;

                // تحديث النقاط
                const dots = carousel.querySelectorAll('.owl-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        }

        // دوران تلقائي كل 5 ثواني
        const interval = setInterval(rotateCarousel, 5000);

        // النقاط اليدوية
        const dots = carousel.querySelectorAll('.owl-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(interval); // نوقف التكرار المؤقت عند التفاعل
                currentIndex = index;

                const itemWidth = items[0].offsetWidth;
                const offset = -currentIndex * itemWidth;

                const stage = carousel.querySelector('.owl-stage');
                if (stage) {
                    stage.style.transition = 'transform 0.5s ease';
                    stage.style.transform = `translate3d(${offset}px, 0px, 0px)`;
                }

                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === currentIndex);
                });
            });
        });
    }
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
