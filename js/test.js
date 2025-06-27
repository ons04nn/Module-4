$(function() {
    const dataGroup = [
        {
            question: "Сколько часов <br>в день вы спите?",
            answers: [
                {
                    answer: 'Менее семи',
                    points: 1,
                },
                {
                    answer: 'Семь-девять',
                    points: 2,
                },
                {
                    answer: 'Более девяти',
                    points: 3,
                }
            ]
        },
        {
            question: "Во сколько <br>вы ложитесь спать?",
            answers: [
                {
                    answer: 'После 23.00',
                    points: 1,
                },
                {
                    answer: 'В 22.00-23.00',
                    points: 2,
                },
                {
                    answer: 'В 21.00-22.00',
                    points: 3,
                }
            ]
        },
        {
            question: "Вы пользуетесь смартфоном <br>непосредственно перед отходом ко сну?",
            answers: [
                {
                    answer: 'Да',
                    points: 1,
                },
                {
                    answer: 'Время от времени',
                    points: 2,
                },
                {
                    answer: 'Нет',
                    points: 3,
                }
            ]
        },
        {
            question: "Вы засыпаете <br>в абсолютной темноте?",
            answers: [
                {
                    answer: 'Нет',
                    points: 1,
                },
                {
                    answer: 'Да',
                    points: 3,
                }
            ]
        },
        {
            question: "Окна вашей спальни <br>выходят на освещенную улицу?",
            answers: [
                {
                    answer: 'Да',
                    points: 1,
                },
                {
                    answer: 'Нет',
                    points: 3,
                }
            ]
        },
        {
            question: "Какая температура <br>в вашей спальне?",
            answers: [
                {
                    answer: 'Выше 22 °С',
                    points: 1,
                },
                {
                    answer: 'Ниже 22 °С',
                    points: 3,
                }
            ]
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
        if (questionView == dataGroup.length) {
         
            let resultUrl = `./test_answer/answer1.html?score=${amount}`;
           
                        $('.question').html('Тест завершен!<br>Загрузка результатов');
            
            setTimeout(function() {
                window.location.href = resultUrl;
            }, 2000); // Перенаправление через 2 секунды
        }
        else {
            $('.steps').html((questionView + 1) + ' / ' + dataGroup.length);
            $('.question').html(dataGroup[questionView].question);
            $('.answers').html('');
            
            $.each(dataGroup[questionView].answers, (key, value) => {
                $('.answers').append('<div class="answer" data-points="' + value.points + '">' + value.answer + '</div>');
            });

            $('.answer').click(function() {
                amount += parseInt($(this).data('points'));
                questionView += 1;
                viewQuiz();
            });
        }
    }

    viewQuiz();
});