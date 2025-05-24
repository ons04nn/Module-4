$(function() {
    const dataGroup = [
        {
            question: "Сколько часов <br>в день вы спите?",
            answers: ["Менее семи", "Семь-девять", "Более девяти"]
        },
        {
            question: "Во сколько <br>вы ложитесь спать?",
            answers: ["После 23.00", "В 22.00-23.00", "В 21.00-22.00"]
        },
        {
            question: "Вы пользуетесь смартфоном <br>непосредственно перед отходом ко сну?",
            answers: ["Да", "Время от времени", "Нет"]
        },
        {
            question: "Вы засыпаете <br>в абсолютной темноте?",
            answers: ["Нет", "Да"]
        },
        {
            question: "Окна вашей спальни <br>выходят на освещенную улицу?",
            answers: ["Да", "Нет"]
        },
        {
            question: "Какая температура <br>в вашей спальне?",
            answers: ["Выше 22 °С", "Ниже 22 °С"]
        }
    ];

    const dataResult = [
        {
            start: 12,
            finish: 15,
            link: '/link.html'
        },
        {
            start: 16,
            finish: 19,
            link: '/link.html'
        },
        {
            start: 20,
            finish: 24,
            link: '/link.html'
        },
        {
            start: 25,
            finish: 28,
            link: '/link.html'
        },
    ];

    let questionView = 0;
    let amount = 0;

    function viewQuiz() {
        console.log(questionView);
        $('.steps').html((questionView + 1) + ' / ' + dataGroup.length);
        $('.question').html(dataGroup[questionView].question);
        $('.answers').html('');
        $.each(dataGroup[questionView].answers, (key, value) => {
            $('.answers').append('<div class="answer">' + value + '</div>');
        });

        $('.answer').click(function() {
            questionView += 1;
            viewQuiz();
        });
    }

    viewQuiz();
});
