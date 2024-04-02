// ข้อมูลผู้ประกอบการและนักศึกษา
let businesses = [
  {
    id: 1,
    name: "บริษัทโปรแกรมจำกัด",
    role: "business",
    expertise: ["Programming", "Marketing", "Design"],
  },
  {
    id: 2,
    name: "บริบัทการจัดการ",
    role: "business",
    expertise: ["Finance", "Management"],
  },
  {
    id: 3,
    name: "บริษัทดาต้าจำกัด",
    role: "business",
    expertise: ["Programming", "Data Analysis"],
  },
  {
    id: 4,
    name: "บริษัทออกแบบ",
    role: "business",
    expertise: ["UX/UI", "Frontend", "Backend"],
  },
  {
    id: 5,
    name: "บริษัทจัดการโค้ดดิ้ง",
    role: "business",
    expertise: ["Frontend", "Backend", "Data Analysis"],
  },
];

let interns = [
  {
    id: 1,
    name: "นาย กิตติพงษ์ เดชจิต",
    role: "intern",
    skills: ["Programming", "Data Analysis"],
  },
  {
    id: 2,
    name: "นายณพัธร สายทองสุข",
    role: "intern",
    skills: ["Marketing", "Design"],
  },
  {
    id: 3,
    name: "นาย ทศพล นิลเพรช",
    role: "intern",
    skills: ["Finance", "Management"],
  },
  {
    id: 4,
    name: "นาย มาร์ค สะอาด",
    role: "intern",
    skills: ["Frontend", "Backend"],
  },
  {
    id: 5,
    name: "นาย นิติ สุรคงคา",
    role: "intern",
    skills: ["UX/UI", "Data Analysis"],
  },
];

// แสดงผู้ประกอบการและนักศึกษาทั้งหมด
function displayAll() {
  const businessesElement = document.getElementById("businesses");
  const internsElement = document.getElementById("interns");

  businessesElement.innerHTML = "<h2>Businesses</h2>";
  businesses.forEach((business) => {
    const businessDiv = document.createElement("div");
    businessDiv.textContent = `${business.name} (${business.expertise.join(
      ", "
    )})`;
    businessesElement.appendChild(businessDiv);
  });

  internsElement.innerHTML = "<h2>Interns</h2>";
  interns.forEach((intern) => {
    const internDiv = document.createElement("div");
    internDiv.textContent = `${intern.name} (${intern.skills.join(", ")})`;
    internsElement.appendChild(internDiv);
  });
}

// ฟังก์ชันสำหรับจับคู่
function match() {
  const matches = [];

  // วนลูปทุกโปรแกรมธุรกิจ
  businesses.forEach((business) => {
    // วนลูปทุกนักศึกษา
    interns.forEach((intern) => {
      // ตรวจสอบว่าความถนัดของโปรแกรมธุรกิจตรงกับทักษะของนักศึกษาหรือไม่
      const commonSkills = business.expertise.filter((skill) =>
        intern.skills.includes(skill)
      );
      // หากมีความถนัดที่ตรงกัน
      if (commonSkills.length > 0) {
        // ตรวจสอบว่าคู่ความถนัดนี้ยังไม่มีอยู่ในรายการ matches แล้วหรือไม่
        const isMatchExist = matches.some(
          (match) =>
            match.business.id === business.id && match.intern.id === intern.id
        );
        if (!isMatchExist) {
          // เพิ่มคู่ความถนัดในรายการ
          matches.push({
            business: business,
            intern: intern,
            commonSkills: commonSkills,
          });
        }
      }
    });
  });

  // แสดงผลลัพธ์
  const matchesElement = document.getElementById("matches");
  matchesElement.innerHTML = "";
  matches.forEach((pair) => {
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    matchDiv.innerHTML = `
            <p><strong>${pair.intern.name}</strong> ควรฝึกงานกับ <strong>${
      pair.business.name
    }</strong> ที่ต้องการความถนัด <strong>${pair.commonSkills.join(
      ", "
    )}</strong></p>
        `;
    matchesElement.appendChild(matchDiv);
  });
}

// เพิ่มฟังก์ชันสำหรับเพิ่มผู้ประกอบการ
function addBusiness() {
  const name = document.getElementById("businessName").value;
  const expertise = document
    .getElementById("businessExpertise")
    .value.split(",")
    .map((item) => item.trim());
  const id = businesses.length + 1;
  businesses.push({ id, name, role: "business", expertise });
  displayAll();
}

// เพิ่มฟังก์ชันสำหรับเพิ่มนักศึกษา
function addIntern() {
  const name = document.getElementById("internName").value;
  const skills = document
    .getElementById("internSkills")
    .value.split(",")
    .map((item) => item.trim());
  const id = interns.length + 1;
  interns.push({ id, name, role: "intern", skills });
  displayAll();
}

// เรียกใช้งานฟังก์ชันแสดงผู้ประกอบการและนักศึกษาทั้งหมด
displayAll();
