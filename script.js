const prices = {
  "المسجل": {
    "عربي": 50,
    "إنجليزي": 50,
    "تربية": 30,
    "تاريخ": 30
  },
  "التفاعلي": {
    "عربي": 60,
    "إنجليزي": 60,
    "تربية": 40,
    "تاريخ": 40
  },
  "المباشر": {
    "عربي": 70,
    "إنجليزي": 70,
    "تربية": 50,
    "تاريخ": 50
  }
};

const subjectsContainer = document.getElementById('subjectsContainer');
const numSubjectsInput = document.getElementById('numSubjects');
const form = document.getElementById('subjectsForm');
const outputDiv = document.getElementById('output');
const errorDiv = document.getElementById('error');

function createSubjectInputs(index) {
  const div = document.createElement('div');
  div.className = 'subject-block';

  div.innerHTML = `
    <label>📚 نوع النظام للمادة رقم ${index + 1}:</label>
    <select name="system_${index}">
      <option value="">-- اختر النظام --</option>
      <option value="المسجل">المسجل</option>
      <option value="التفاعلي">التفاعلي</option>
      <option value="المباشر">المباشر</option>
    </select>
    <label>📘 المادة رقم ${index + 1}:</label>
    <select name="type_${index}">
      <option value="">-- اختر المادة --</option>
      <option value="عربي">عربي</option>
      <option value="إنجليزي">إنجليزي</option>
      <option value="تربية">تربية</option>
      <option value="تاريخ">تاريخ</option>
    </select>
  `;
  return div;
}

function renderSubjects() {
  subjectsContainer.innerHTML = '';
  let n = parseInt(numSubjectsInput.value);
  if (isNaN(n) || n < 1) n = 1;
  if (n > 4) n = 4;
  numSubjectsInput.value = n;
  for (let i = 0; i < n; i++) {
    subjectsContainer.appendChild(createSubjectInputs(i));
  }
  outputDiv.style.display = 'none';
  errorDiv.style.display = 'none';
}

numSubjectsInput.addEventListener('input', renderSubjects);

form.addEventListener('submit', e => {
  e.preventDefault();
  errorDiv.textContent = '';
  errorDiv.style.display = 'none';
  outputDiv.style.display = 'none';

  const formData = new FormData(form);
  const subjects = [];

  const numSubjects = parseInt(numSubjectsInput.value);

  for (let i = 0; i < numSubjects; i++) {
    const system = formData.get(`system_${i}`);
    const type = formData.get(`type_${i}`);

    if (!system || !type) {
      errorDiv.textContent = `⚠️ الرجاء اختيار النظام والمادة للمادة رقم ${i + 1}`;
      errorDiv.style.display = 'block';
      return;
    }

    subjects.push({system, type});
  }

  let total_price = 0;
  subjects.forEach(sub => {
    total_price += prices[sub.system][sub.type];
  });

  let discount = 0;
  if (numSubjects === 2 || numSubjects === 3) discount = 0.20;
  else if (numSubjects === 4) discount = 0.30;

  const final_price = total_price * (1 - discount);

  outputDiv.innerHTML = `
    <p>💵 السعر قبل الخصم: <strong>${total_price} دينار</strong></p>
    <p>🎁 نسبة الخصم: <strong>${discount * 100}%</strong></p>
    <p>✅ السعر بعد الخصم: <strong>${final_price.toFixed(2)} دينار</strong></p>
  `;
  outputDiv.style.display = 'block';
});

renderSubjects();
