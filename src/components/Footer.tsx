import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="alert alert-dismissible alert-info">
          <h4>Підготуйте свої файли</h4>
          <ul>
            <li>
              .patt - шаблон маркеру, який ви можете створити за{" "}
              <b>
                <a
                  href="https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html"
                  target="_blank"
                >
                  цим посиланням
                </a>
              </b>
              . Переконайтеся, що встановлено "Pattern Ration 0.90".
            </li>
            <li>
              barcode - баркод який може використовуватися замість маркера.
              Бакрод можна створити за{" "}
              <b>
                <a
                  href="https://au.gmented.com/app/marker/marker.php"
                  target="_blank"
                >
                  цим посиланням
                </a>
              </b>
              . Перевірте, що встановлені наступні ключові опції:
              <li> Border size (% of marker width): 0.1 </li>
              <li> Barcode dimensions: 3х3 </li>
              <li> Markers have black borders.</li>
            </li>
            <li>
              .mtl .obj - модель. Обидва файли повинні бути правильно
              підготовлені з їх текстурою.
            </li>
          </ul>
          <h4>Робота з генератором</h4>
          <ol>
            <li>
              Додайте усі файли маркерів, які ви будете використовувати у своєму
              проекті, або ви можете вказати код баркоду та використовувати його
              замість маркеру. Це створить таблицю, яку ви можете
              використовувати для введення інших файлів вашого проєкту.
              <br></br>
            </li>
            <li>
              Ви можете вибрати, який тип вмісту буде пов’язаний з кожним
              шаблоном. Для одного шаблону ви можете вибрати модель, відео чи
              зображення з одним аудіофайлом для кожного шаблону. Не
              рекомендується використовувати більше одного аудіо чи відео файлу
              у проєкті.
              <br></br>
            </li>
            <li>
              Додайте усі файли контексту та нажміть кнопку "Підтвердити",
              з'явиться текст вашоного index.html файлу.
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Footer;
