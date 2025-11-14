// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", function () {
  initializeChart();
  initializeTaskInteractions();
  initializeStatCards();
  initializeMobileMenu();
  initializeAccordionTracking();
});

// ==================== CHART INITIALIZATION ====================
function initializeChart() {
  const ctx = document.getElementById("trendsChart");

  if (!ctx) return;

  // Data matching the EXACT pattern from the image
  const todayData = [
    15, 18, 20, 24, 28, 35, 42, 52, 48, 35, 22, 18, 15, 38, 42, 38, 32, 28, 25,
    22, 20, 18, 16,
  ];

  const yesterdayData = [
    12, 14, 16, 18, 20, 22, 24, 26, 28, 26, 24, 22, 20, 18, 17, 16, 15, 14, 13,
    12, 11, 10, 9,
  ];

  // Create gradients for area fill matching the image
  const gradient1 = ctx.getContext("2d").createLinearGradient(0, 0, 0, 254);
  gradient1.addColorStop(0, "rgba(63, 81, 181, 0.08)");
  gradient1.addColorStop(1, "rgba(63, 81, 181, 0.0)");

  const gradient2 = ctx.getContext("2d").createLinearGradient(0, 0, 0, 254);
  gradient2.addColorStop(0, "rgba(200, 200, 210, 0.05)");
  gradient2.addColorStop(1, "rgba(200, 200, 210, 0.0)");

  // Create the chart
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
      ],
      datasets: [
        {
          label: "Today",
          data: todayData,
          borderColor: "#5b7cff",
          backgroundColor: gradient1,
          borderWidth: 2.5,
          fill: true,
          tension: 0.45,
          pointRadius: 0,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#5b7cff",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 3,
          pointHitRadius: 20,
        },
        {
          label: "Yesterday",
          data: yesterdayData,
          borderColor: "#d0d2de",
          backgroundColor: gradient2,
          borderWidth: 2,
          fill: true,
          tension: 0.45,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#d0d2de",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2,
          pointHitRadius: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 10,
          borderColor: "#dfe0eb",
          borderWidth: 1,
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          titleFont: {
            size: 13,
            weight: "600",
            family: "Mulish",
          },
          bodyFont: {
            size: 12,
            family: "Mulish",
          },
          displayColors: false,
          caretSize: 6,
          caretPadding: 8,
          callbacks: {
            title: function (context) {
              return `${context[0].parsed.y}`;
            },
            label: function (context) {
              return "";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 60,
          position: "right",
          ticks: {
            stepSize: 10,
            color: "#9FA2B4",
            font: {
              size: 11,
              weight: "400",
              family: "Mulish",
            },
            padding: 8,
            callback: function (value) {
              return value;
            },
          },
          grid: {
            color: "#f0f0f5",
            drawBorder: false,
            lineWidth: 1,
            drawTicks: false,
          },
          border: {
            display: false,
          },
        },
        x: {
          ticks: {
            color: "#9FA2B4",
            font: {
              size: 11,
              weight: "400",
              family: "Mulish",
            },
            padding: 8,
            maxRotation: 0,
            autoSkip: false,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          border: {
            display: false,
          },
        },
      },
      animation: {
        duration: 800,
        easing: "easeInOutCubic",
      },
      layout: {
        padding: {
          top: 20,
          right: 45,
          bottom: 20,
          left: 20,
        },
      },
    },
  });

  // Store chart instance
  window.dashboardChart = chart;
}

function initializeStatCards() {
  const statCards = document.querySelectorAll(".stat-card");

  statCards.forEach((card) => {
    card.addEventListener("click", function () {
      statCards.forEach((c) => c.classList.remove("stat-card-active"));
      this.classList.add("stat-card-active");

      const label = this.querySelector(".stat-label").textContent;
      console.log(`Stat card clicked: ${label}`);
    });
  });
}

function initializeTaskInteractions() {
  const taskInput = document.querySelector(".task-input");
  const taskAddBtn = document.querySelector(".task-add-btn");

  if (taskInput && taskAddBtn) {
    taskInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && this.value.trim()) {
        addNewTask(this.value.trim());
        this.value = "";
      }
    });

    taskAddBtn.addEventListener("click", function () {
      if (taskInput.value.trim()) {
        addNewTask(taskInput.value.trim());
        taskInput.value = "";
      }
    });
  }
}

function initializeAccordionTracking() {
  const accordionElement = document.getElementById("ticketsAccordion");

  if (accordionElement) {
    accordionElement.addEventListener("shown.bs.collapse", function (e) {
      console.log("Unresolved tickets expanded");
    });

    accordionElement.addEventListener("hidden.bs.collapse", function (e) {
      console.log("Unresolved tickets collapsed");
    });
  }
}

function initializeMobileMenu() {
  const header = document.querySelector(".content-header h1");

  if (header && window.innerWidth <= 768) {
    const existingBtn = document.querySelector(".mobile-menu-toggle");

    if (!existingBtn) {
      const menuBtn = document.createElement("button");
      menuBtn.className = "mobile-menu-toggle";
      menuBtn.innerHTML = '<i class="bi bi-list"></i>';
      menuBtn.addEventListener("click", toggleSidebar);
      header.parentNode.insertBefore(menuBtn, header);
    }
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    document.addEventListener("click", closeSidebarOnClickOutside);
  }
}

function closeSidebarOnClickOutside(e) {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".mobile-menu-toggle");

  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebar.classList.remove("active");
    document.removeEventListener("click", closeSidebarOnClickOutside);
  }
}

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("active");
  }

  initializeMobileMenu();

  if (window.dashboardChart) {
    window.dashboardChart.resize();
  }
});
