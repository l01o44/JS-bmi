          let results = [];

          const form = document.forms.main;

          function calcBmi() {
            let json = toJson(form.name.value, form.birthday.value, form.city.value, form.weight.value, form.height.value);
            if (!check(json)) {
              document.getElementById("result1").innerText = "Неверные данные. Пожалуйста, заполните все поля корректно.";
              document.getElementById("result2").innerHTML = json;
              return;
            }
            
            const bmi = calculator(json);
            const description = getResults(bmi);
            let resultObj = JSON.parse(json);
            resultObj['bmi'] = bmi;
            results.push(resultObj);
            document.getElementById("result1").innerText = description;
            
          }

          function toJson(name, birthday, city, weight, height) {
            let user = {
              "name": name,
              "birthday": birthday,
              "city": city,
              "weight": parseFloat(weight),
              "height": parseFloat(height)
            }
            return JSON.stringify(user);
          }

          function check(json) {
            let user = JSON.parse(json);
            if (user.weight > 0 && user.height > 0) return true;
            return false;
          }

          function calculator(json) {
            let user = JSON.parse(json);
            let bmi = user["weight"] / ((user["height"]*0.01) **2);
            return bmi;
          }

          function showResults() {
            if (results.lenght != 0) {
              result1.innerHTML = 'Информация выведена в консоль';
              console.log(results);
            }
            else {
              document.getElementById("result1").innerText = 'Информация по расчетам отсутствует';
            }
          }

          function getResults(bmi) {
            if (bmi < 16) return 'Выраженный дефицит массы тела';
            if (bmi >= 16 && bmi < 18.5) return 'Недостаточная масса тела (дефицит)';
            if (bmi >= 18.5 && bmi < 25) return 'Норма';
            if (bmi >= 25 && bmi < 30) return 'Избыточная масса тела (состояние, предшествующее ожирению)';
            if (bmi >= 30 && bmi < 35) return 'Ожирение 1-й степени';
            if (bmi >= 35 && bmi < 40) return 'Ожирение 2-й степени';
            if (bmi >= 40) return 'Ожирение 3-й степени';
          }

          