if (!localStorage.getItem("shedules"))
    localStorage.setItem("shedules", JSON.stringify([
        {
            "id": 1,
            "name": "Йога",
            "time": "10:00 - 11:00",
            "maxParticipants": 15,
            "currentParticipants": 8
        },
        {
            "id": 2,
            "name": "Пилатес",
            "time": "11:30 - 12:30",
            "maxParticipants": 10,
            "currentParticipants": 5
        },
        {
            "id": 3,
            "name": "Кроссфит",
            "time": "13:00 - 14:00",
            "maxParticipants": 20,
            "currentParticipants": 15
        },
        {
            "id": 4,
            "name": "Танцы",
            "time": "14:30 - 15:30",
            "maxParticipants": 12,
            "currentParticipants": 10
        },
        {
            "id": 5,
            "name": "Бокс",
            "time": "16:00 - 17:00",
            "maxParticipants": 8,
            "currentParticipants": 7
        }
    ]));

let myClass = [3];

if (!localStorage.getItem("myClass"))
    localStorage.setItem("myClass", JSON.stringify(myClass));

const shedulesEl = document.querySelector(".shedules");
const shedules = JSON.parse(localStorage.getItem("shedules"));
myClass = JSON.parse(localStorage.getItem("myClass"));

shedules.forEach(shedule => {
    const sheduleEl = document.createElement("tr");

    const column1El = document.createElement("td");
    const column2El = document.createElement("td");
    const column3El = document.createElement("td");
    const column4El = document.createElement("td");
    const column5El = document.createElement("td");
    const column6El = document.createElement("td");
    const buttonSignupEl = document.createElement("button");
    const buttonCancelEl = document.createElement("button");

    column1El.textContent = shedule.name;
    column1El.className = "sheduleName";
    column2El.textContent = shedule.time;
    column2El.className = "sheduleTime";
    column3El.textContent = shedule.maxParticipants;
    column3El.className = "sheduleMax";
    column4El.textContent = shedule.currentParticipants;
    column4El.className = "sheduleCur";
    buttonSignupEl.textContent = "Записаться";
    buttonSignupEl.className = "buttonSignup";
    buttonCancelEl.textContent = "Отменить";
    buttonCancelEl.className = "buttonCancel";
    buttonCancelEl.style.display = "none";

    column5El.appendChild(buttonSignupEl);
    column6El.appendChild(buttonCancelEl);

    sheduleEl.appendChild(column1El);
    sheduleEl.appendChild(column2El);
    sheduleEl.appendChild(column3El);
    sheduleEl.appendChild(column4El);
    sheduleEl.appendChild(column5El);
    sheduleEl.appendChild(column6El);

    shedulesEl.appendChild(sheduleEl);

    if (shedule.maxParticipants === shedule.currentParticipants)
        buttonSignupEl.style.display = "none";

    if (myClass.includes(Number(shedule.id))) {
        buttonSignupEl.style.display = "none";
        buttonCancelEl.style.display = "block";
    }
});

shedulesEl.addEventListener('click', e => {
    if (e.target.classList.contains("buttonSignup")) {
        const trEl = e.target.closest("tr");
        const buttonSignupEl = trEl.querySelector(".buttonSignup");
        const buttonCancelEl = trEl.querySelector(".buttonCancel");
        const currentParEl = trEl.querySelector(".sheduleCur");
        const sheduleName = trEl.firstChild.textContent;
        myClass.push(Number(shedules.filter(s => s.name === sheduleName).map(s => s.id)));
        const currentShedule = shedules.filter(s => s.name === sheduleName)[0];
        currentShedule.currentParticipants += 1;
        currentParEl.textContent = currentShedule.currentParticipants;
        localStorage.setItem("shedules", JSON.stringify(shedules));
        localStorage.setItem("myClass", JSON.stringify(myClass));
        buttonSignupEl.style.display = "none";
        buttonCancelEl.style.display = "block";
    }
    else if (e.target.classList.contains("buttonCancel")) {
        const trEl = e.target.closest("tr");
        const buttonSignupEl = trEl.querySelector(".buttonSignup");
        const buttonCancelEl = trEl.querySelector(".buttonCancel");
        const currentParEl = trEl.querySelector(".sheduleCur");
        const sheduleName = trEl.firstChild.textContent;

        const index = myClass.indexOf(Number(shedules.filter(s => s.name === sheduleName).map(s => s.id)));
        if (index > -1)
            myClass.splice(index, 1);

        const currentShedule = shedules.filter(s => s.name === sheduleName)[0];
        currentShedule.currentParticipants -= 1;
        currentParEl.textContent = currentShedule.currentParticipants;
        localStorage.setItem("shedules", JSON.stringify(shedules));
        localStorage.setItem("myClass", JSON.stringify(myClass));
        buttonSignupEl.style.display = "block";
        buttonCancelEl.style.display = "none";
    }
});




