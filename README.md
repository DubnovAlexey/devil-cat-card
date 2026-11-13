<!--suppress MarkdownUnresolvedFileReference -->

# Devil Cat Card

[English](#english) · [Русский](#russian) · [עברית](#hebrew) · [Español](#spanish) · [Français](#french)

<a name="english"></a>

## English

A joke business card for my cat Vasily, "Senior Night Galloper & Soul Demander". My second homework in the Full Stack course: a card page made with HTML and CSS, with a few surprises.

**Live demo:** https://dubnovalexey.github.io/devil-cat-card/

### Quick tour

Open the Call, Email and Cat Secretary pages and return to the card. Use Tab and Enter/Space on the photo to try music without relying on a mouse.

Compare `index.html`, `phone.html`, `email.html` and `secretary.html` with `src/css/style.css`. The contacts belong to the fictional card; the pages demonstrate navigation and media, not a messaging backend.

The language links above switch the documentation; they do not translate the existing demo interface.

### Features

- A card with a photo, a job title, contacts and three links: Call, Email and Cat Secretary.
- Each link opens its own page with a picture or a looping video and a way back.
- A click on the photo (or Enter / Space on the keyboard) plays or pauses the music.
- Works on a phone: every page has a responsive viewport.
- **Living pictures** (`src/js/alive.js`): Vasily's eyes and pentacle glow and flare on hover or touch, the hooded skulls deep in his pupils slowly pulse, he breathes, rain runs down the glass, dragonflies circle, sparks, smoke and lightning fly on the Email page. The pictures of Call and Email are our own generated images in the style of the earlier ones; the old files are kept.
- **Surprises** (`src/js/surprises.js`): now and then Vasily's paw scratches the screen with fiery claws, the paw snatches a hovering dragonfly, a pentacle burns in, a contract with a paw-print signature burns away. One at a time, never on a hidden tab or with reduced motion; the 🐾 button in the corner switches them off.

### Music

The photo starts a sequential two-track playlist that repeats after the last track:

- Carbon Based Lifeforms — "Photosynthesis"
- HEIM — "Lonmina" (filename credit)

The music belongs to its authors and is used only in this non-commercial study project. If you hold the rights to a track and want it removed, please open an issue and I will remove it.

### Tech stack

HTML5 · CSS3 · a few lines of JavaScript · `<audio>` and `<video>` · GitHub Pages

### What I practised

- Page structure with semantic HTML and links between pages.
- Styling a card: layout, shadows, hover effects.
- Media in the browser: autoplay rules (a video starts only muted), audio controlled from JavaScript.

### Run locally

Open `index.html` in a browser.

### Planned improvements

These are proposals, not currently implemented features.

- Visual: refine small-text contrast, offer reduced motion and use a compact cat-eye favicon.
- Engineering: define media pause/cleanup when leaving the page and retain keyboard playback checks.
- Functionality: add an optional short cat-fact interaction to the secretary page.

---

<a name="russian"></a>

## Русский

**Визитка кота-дьявола**

Шуточная визитка моего кота Василия — «старшего ночного скакуна и требователя душ». Второе домашнее задание курса Full Stack: страница-визитка на HTML и CSS с несколькими сюрпризами.

**Демо:** https://dubnovalexey.github.io/devil-cat-card/

### Быстрый просмотр

Откройте Call, Email и Cat Secretary и вернитесь к карточке. Клавишами Tab и Enter/пробел проверьте музыку на фото без мыши.

Сопоставьте `index.html`, `phone.html`, `email.html`, `secretary.html` и `src/css/style.css`. Контакты относятся к шуточному персонажу: это демонстрация навигации и медиа, без сервера сообщений.

Языковые ссылки выше переключают документацию, а не переводят существующий интерфейс демо.

### Возможности

- Карточка с фото, должностью, контактами и тремя ссылками: Call, Email и Cat Secretary.
- Каждая ссылка открывает свою страницу с картинкой или видео по кругу и кнопкой назад.
- Щелчок по фото (или Enter / пробел с клавиатуры) включает и ставит на паузу музыку.
- Работает на телефоне: у каждой страницы адаптивный viewport.
- **Живые картинки** (`src/js/alive.js`): глаза и пентаграмма Василия тлеют и вспыхивают при наведении или касании, черепа в капюшонах в глубине зрачков едва заметно пульсируют, кот дышит, по стеклу текут капли, кружат стрекозы, на странице Email летят искры и дым, бьют молнии. Картинки Call и Email — наши собственные, нарисованные в стиле прежних; старые файлы сохранены.
- **Неожиданности** (`src/js/surprises.js`): изредка лапа Василия царапает экран огненными когтями, лапа выхватывает зависшую стрекозу, на экране прожигается пентаграмма, договор с отпечатком лапы сгорает. По одной за раз, не на скрытой вкладке и не при «уменьшить движение»; кнопка 🐾 в углу их выключает.

### Музыка

Фото запускает последовательный плейлист из двух композиций; после последней он повторяется:

- Carbon Based Lifeforms — «Photosynthesis»
- HEIM — «Lonmina» (по имени файла)

Музыка принадлежит авторам и используется только в этом некоммерческом учебном проекте. Если вы правообладатель и хотите, чтобы трек убрали, откройте issue — уберу.

### Стек

HTML5 · CSS3 · немного JavaScript · `<audio>` и `<video>` · GitHub Pages

### Чему научился

- Структура страницы на семантическом HTML и ссылки между страницами.
- Оформление карточки: раскладка, тени, эффекты при наведении.
- Медиа в браузере: правила автозапуска (видео стартует только без звука), управление звуком из JavaScript.

### Как запустить

Откройте `index.html` в браузере.

### План развития

Это предложения, а не уже реализованные возможности.

- Визуал: улучшить контраст мелкого текста, предусмотреть reduced motion и компактный favicon кошачьих глаз.
- Инженерия: определить остановку и освобождение медиа при уходе со страницы, сохранить проверки клавиатурного управления.
- Функции: добавить необязательную короткую реплику или факт о котах на странице секретаря.

---

<a name="hebrew"></a>

<div dir="rtl">

## עברית

**כרטיס ביקור של החתול השטן**

כרטיס ביקור בצחוק לחתול שלי וסילי, "דוהר לילה בכיר ודורש נשמות". שיעורי הבית השניים בקורס Full Stack: דף כרטיס ב-HTML וב-CSS עם כמה הפתעות.

**הדגמה:** https://dubnovalexey.github.io/devil-cat-card/

### סיור קצר

פתחו את Call, Email ו־Cat Secretary וחזרו לכרטיס. השתמשו ב־Tab וב־Enter/רווח על התמונה כדי לבדוק מוזיקה ללא עכבר.

השוו את `index.html`, `phone.html`, `email.html`, `secretary.html` ואת `src/css/style.css`. פרטי הקשר שייכים לדמות ההומוריסטית; זו הדגמת ניווט ומדיה, ללא שרת הודעות.

קישורי השפה למעלה מחליפים את התיעוד, ולא מתרגמים את ממשק ההדגמה הקיים.

### יכולות

- כרטיס עם תמונה, תפקיד, פרטי קשר ושלושה קישורים: Call, Email ו-Cat Secretary.
- כל קישור פותח דף משלו עם תמונה או סרטון בלולאה ודרך חזרה.
- לחיצה על התמונה (או Enter / רווח במקלדת) מפעילה ועוצרת את המוזיקה.
- עובד בטלפון.
- **תמונות חיות** (`src/js/alive.js`): העיניים והפנטגרמה של וסילי בוערות ומתלקחות במעבר עכבר או במגע, הגולגלות בברדסים בעומק האישונים פועמות בעדינות, החתול נושם, טיפות זולגות על הזכוכית, שפיריות חגות מסביב, ובעמוד Email עפים ניצוצות ועשן ומכים ברקים. התמונות של Call ושל Email הן תמונות שיצרנו בעצמנו בסגנון הקודמות; הקבצים הישנים נשמרו.
- **הפתעות** (`src/js/surprises.js`): מדי פעם הכפה של וסילי שורטת את המסך בציפורניים בוערות, הכפה חוטפת שפירית שמרחפת, פנטגרמה נצרבת על המסך וחוזה עם טביעת כפה נשרף. אחת בכל פעם, לא בלשונית מוסתרת ולא כשמבקשים פחות תנועה; הכפתור 🐾 בפינה מכבה אותן.

### מוזיקה

התמונה מפעילה רשימת השמעה של שני קטעים לפי הסדר, שחוזרת להתחלה בסיום:

- Carbon Based Lifeforms — "Photosynthesis"
- HEIM — "Lonmina" (לפי שם הקובץ)

המוזיקה שייכת ליוצריה ומשמשת רק בפרויקט לימודי לא מסחרי זה. בעלי זכויות שרוצים שרצועה תוסר מוזמנים לפתוח issue ואסיר אותה.

### טכנולוגיות

HTML5 · CSS3 · מעט JavaScript · `<audio>` ו-`<video>` · GitHub Pages

### הרצה מקומית

פתחו את `index.html` בדפדפן.

### שיפורים מתוכננים

אלה הצעות, לא יכולות שכבר מומשו.

- חזות: לשפר ניגודיות בטקסט קטן, להציע הפחתת תנועה וסמל עיני חתול קטן.
- הנדסה: להגדיר עצירה ושחרור מדיה ביציאה מהדף ולשמור בדיקות ניגון במקלדת.
- יכולות: להוסיף תגובה קצרה או עובדה על חתולים בדף המזכיר.

</div>

---

<a name="spanish"></a>

## Español

**Tarjeta de visita del gato diablo**

Una tarjeta de visita en broma de mi gato Vasili, «corcel nocturno mayor y reclamador de almas». Segunda tarea del curso Full Stack: una página-tarjeta en HTML y CSS con algunas sorpresas.

**Demo:** https://dubnovalexey.github.io/devil-cat-card/

### Recorrido rápido

Abra Call, Email y Cat Secretary y vuelva a la tarjeta. Con Tab y Enter/espacio pruebe la música de la foto sin ratón.

Compare `index.html`, `phone.html`, `email.html`, `secretary.html` y `src/css/style.css`. Los contactos pertenecen a un personaje de broma: es una demostración de navegación y medios, sin servidor de mensajes.

Los enlaces de idioma de arriba cambian la documentación; no traducen la interfaz de la demo.

### Funciones

- Tarjeta con foto, cargo, contactos y tres enlaces: Call, Email y Cat Secretary.
- Cada enlace abre su propia página con una imagen o un vídeo en bucle y un botón para volver.
- Un clic en la foto (o Enter / espacio con el teclado) pone y pausa la música.
- Funciona en el móvil: cada página tiene un viewport adaptable.
- **Imágenes vivas** (`src/js/alive.js`): los ojos y el pentáculo de Vasili brillan y se encienden al pasar el ratón o al tocar, las calaveras encapuchadas del fondo de sus pupilas laten despacio, el gato respira, las gotas resbalan por el cristal, giran libélulas y en la página Email vuelan chispas y humo y caen rayos. Las imágenes de Call y Email son nuestras, generadas en el estilo de las anteriores; los archivos antiguos se conservan.
- **Sorpresas** (`src/js/surprises.js`): de vez en cuando la zarpa de Vasili araña la pantalla con garras de fuego, la zarpa atrapa una libélula que revolotea, un pentáculo se graba a fuego y un contrato firmado con la huella de una pata se quema. Una cada vez, nunca en una pestaña oculta ni con movimiento reducido; el botón 🐾 de la esquina las desactiva.

### Música

La foto inicia una lista de dos temas que suenan seguidos; tras el último vuelve a empezar:

- Carbon Based Lifeforms — «Photosynthesis»
- HEIM — «Lonmina» (según el nombre del archivo)

La música pertenece a sus autores y solo se usa en este proyecto educativo sin fines comerciales. Si usted es titular de los derechos y quiere que se retire una pista, abra un issue y la quitaré.

### Tecnologías

HTML5 · CSS3 · un poco de JavaScript · `<audio>` y `<video>` · GitHub Pages

### Lo que aprendí

- Estructura de página con HTML semántico y enlaces entre páginas.
- Diseño de la tarjeta: disposición, sombras, efectos al pasar el ratón.
- Medios en el navegador: reglas de reproducción automática (el vídeo arranca solo sin sonido) y control del sonido desde JavaScript.

### Cómo ejecutarlo

Abra `index.html` en el navegador.

### Plan de desarrollo

Son propuestas, no funciones ya implementadas.

- Visual: mejorar el contraste del texto pequeño, prever reduced motion y un favicon compacto de ojos de gato.
- Ingeniería: definir cómo se detienen y liberan los medios al salir de la página y mantener las pruebas de control con teclado.
- Funciones: añadir una frase breve opcional o un dato sobre gatos en la página del secretario.

---

<a name="french"></a>

## Français

**La carte de visite du chat diable**

Une carte de visite humoristique de mon chat Vassili, « grand coursier nocturne et réclameur d'âmes ». Deuxième devoir du cours Full Stack : une page-carte en HTML et CSS avec quelques surprises.

**Démo :** https://dubnovalexey.github.io/devil-cat-card/

### Visite rapide

Ouvrez Call, Email et Cat Secretary, puis revenez à la carte. Avec Tab et Entrée/espace, testez la musique de la photo sans souris.

Comparez `index.html`, `phone.html`, `email.html`, `secretary.html` et `src/css/style.css`. Les contacts appartiennent à un personnage pour rire : c'est une démonstration de navigation et de médias, sans serveur de messages.

Les liens de langue ci-dessus changent la documentation ; ils ne traduisent pas l'interface de la démo.

### Fonctions

- Carte avec photo, fonction, contacts et trois liens : Call, Email et Cat Secretary.
- Chaque lien ouvre sa propre page avec une image ou une vidéo en boucle et un bouton retour.
- Un clic sur la photo (ou Entrée / espace au clavier) lance et met en pause la musique.
- Fonctionne sur téléphone : chaque page a un viewport adaptatif.
- **Images vivantes** (`src/js/alive.js`) : les yeux et le pentacle de Vassili luisent et s’embrasent au survol ou au toucher, les crânes encapuchonnés au fond de ses pupilles palpitent doucement, le chat respire, des gouttes coulent sur la vitre, des libellules tournent autour, et sur la page Email volent des étincelles et de la fumée sous les éclairs. Les images de Call et d’Email sont les nôtres, générées dans le style des précédentes ; les anciens fichiers sont conservés.
- **Surprises** (`src/js/surprises.js`) : de temps en temps la patte de Vassili griffe l’écran de ses griffes de feu, la patte attrape une libellule en vol stationnaire, un pentacle se grave au fer rouge et un contrat signé d’une empreinte de patte part en fumée. Une à la fois, jamais dans un onglet masqué ni avec le mouvement réduit ; le bouton 🐾 dans le coin les désactive.

### Musique

La photo lance une liste de deux morceaux joués à la suite ; après le dernier, elle recommence :

- Carbon Based Lifeforms — « Photosynthesis »
- HEIM — « Lonmina » (d'après le nom du fichier)

La musique appartient à ses auteurs et n'est utilisée que dans ce projet d'étude non commercial. Si vous êtes titulaire des droits et souhaitez qu'une piste soit retirée, ouvrez une issue : je la retirerai.

### Technologies

HTML5 · CSS3 · un peu de JavaScript · `<audio>` et `<video>` · GitHub Pages

### Ce que j'ai appris

- La structure d'une page en HTML sémantique et les liens entre pages.
- La mise en forme de la carte : disposition, ombres, effets au survol.
- Les médias dans le navigateur : règles de lecture automatique (la vidéo ne démarre que sans le son), contrôle du son depuis JavaScript.

### Lancer le projet

Ouvrez `index.html` dans le navigateur.

### Pistes d'évolution

Ce sont des propositions, pas des fonctions déjà réalisées.

- Visuel : améliorer le contraste du petit texte, prévoir reduced motion et un favicon compact aux yeux de chat.
- Ingénierie : définir l'arrêt et la libération des médias quand on quitte la page, garder les tests de contrôle au clavier.
- Fonctions : ajouter une courte réplique facultative ou un fait sur les chats sur la page du secrétaire.
