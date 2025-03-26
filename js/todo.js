$(function() {

    $("#button").click(refreshQuestionnaireList);

    function remplirQuestionnaires(repjson) {
      console.log(JSON.stringify(repjson));
      $('#taches').empty();
      $('#taches').append($('<ul>'));
      for(questionnaire of repjson){
          console.log(questionnaire);
          $('#taches ul')
                .append($('<li>')
                .append($('<a>')
                .text(questionnaire.name)
                    ).on("click", questionnaire, details)
                );
        }
    }

    function onerror(err) {
        $("#taches").html("<b>Impossible de récupérer les questionnaires !</b>"+err);
    }

    function refreshQuestionnaireList(){
        $("#currenttask").empty();
        requete = "http://127.0.0.1:5000/quizz/api/v1/questionnaires";
        fetch(requete)
        .then( response => {
                  if (response.ok) return response.json();
                  else throw new Error('Problème ajax: '+response.status);
                }
            )
        .then(remplirQuestionnaires)
        .catch(onerror);
    }

    function details(event){
        $("#currenttask").empty();
        formQuestionnaire();
        fillFormQuestionnaire(event.data);
    }

    class Questionnaire {
        constructor(name, uri) {
            this.name = name;
            this.uri = uri;
        }
    }

    $("#tools #add").on("click", formQuestionnaire);
    $('#tools #del').on('click', delQuestionnaire);

    function formQuestionnaire(isnew){
        $("#currenttask").empty();
        $("#currenttask")
            .append($('<span>Name<input type="text" id="titre"><br></span>'))
            .append($('<span><input type="hidden" id="turi"><br></span>'))
            .append(isnew?$('<span><input type="button" value="Save questionnaire"><br></span>').on("click", saveNewQuestionnaire)
                         :$('<span><input type="button" value="Modify questionnaire"><br></span>').on("click", saveModifiedQuestionnaire)
                );
    }

    function fillFormQuestionnaire(t){
        $("#currenttask #titre").val(t.name);
        t.uri=(t.uri == undefined)?"http://127.0.0.1:5000/quizz/api/v1/questionnaires"+t.id:t.uri;
        $("#currenttask #turi").val(t.uri);
    }

    function saveNewQuestionnaire(){
        var questionnaire = new Questionnaire(
            $("#currenttask #titre").val()
            );
        console.log(JSON.stringify(questionnaire));
        fetch("http://127.0.0.1:5000/quizz/api/v1/questionnaires",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(questionnaire)
            })
        .then(res => { console.log('Save Success');
                       $("#result").text(res['contenu']);
                       refreshQuestionnaireList();
                   })
        .catch( res => { console.log(res) });
    }

    function saveModifiedQuestionnaire(){
        var questionnaire = new Questionnaire(
            $("#currenttask #titre").val(),
            $("#currenttask #turi").val()
            );
        console.log("PUT");
        console.log(questionnaire.uri);
        console.log(JSON.stringify(questionnaire));
        fetch(questionnaire.uri,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(questionnaire)
            })
        .then(res => { console.log('Update Success');  refreshQuestionnaireList();} )
        .catch( res => { console.log(res) });
    }

    function delQuestionnaire(){
        if ($("#currenttask #turi").val()){
        url = $("#currenttask #turi").val();
        fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE"
            })
        .then(res => { console.log('Delete Success:' + res); } )
        .then(refreshQuestionnaireList)
        .catch( res => { console.log(res);  });
    }
  }

  // QUESTION

  $("#buttonQuestion").click(details2);

  function remplirQuestion(repjson) {
    console.log(JSON.stringify(repjson));
    $('#tachesQuestion').empty();
    $('#tachesQuestion').append($('<ul>'));
    for (let question of repjson) {
        console.log(question);
        $('#tachesQuestion ul')
            .append($('<li>')
                .append($('<a>')
                    .text(question.title)
                ).on("click", question, details2)
            );
    }
}

    function onerror(err) {
        $("#taches").html("<b>Impossible de récupérer les questions !</b>"+err);
    }

    function refreshQuestionList(questionnaireId) {
        let requete = "http://127.0.0.1:5000/quizz/api/v1/questionnaires/" + questionnaireId + "/questions";
        fetch(requete)
            .then(response => {
                if (response.ok) return response.json();
                else throw new Error('Problème ajax: ' + response.status);
            })
            .then(remplirQuestion)
            .catch(onerror);
    }

    function extractIdFromUrl(url) {
        let match = url.match(/\/questionnaires\/(\d+)/);
        return match ? match[1] : null;
    }

    function details2(event){
        $("#currenttask2").empty();
        formQuestion();
        let questionnaireUrl = $("#currenttask #turi").val();
        let questionnaireId = extractIdFromUrl(questionnaireUrl);
        refreshQuestionList(questionnaireId);
    }

    class Question {
        constructor(name, uri) {
            this.name = name;
            this.uri = uri;
        }
    }

    $("#tools #addQuestion").on("click", formQuestion);
    $('#tools #delQuestion').on('click', delQuestion);


  function formQuestion(isnew){
    $("#currenttask2").empty();
    $("#currenttask2")
        .append($('<span>Text<input type="text" id="questionText"><br></span>'))
        .append($('<span><input type="hidden" id="quri"><br></span>'))
        .append(isnew?$('<span><input type="button" value="Save question"><br></span>').on("click", saveNewQuestion)
                     :$('<span><input type="button" value="Modify question"><br></span>').on("click", saveModifiedQuestion)
        );
    }

    function saveNewQuestion() {
        var question = new Question($("#currenttask2 #questionText").val());
        console.log(JSON.stringify(question));
        var questionnaireId = $("#currenttask #turi").val();  
        fetch("http://127.0.0.1:5000/quizz/api/v1/questionnaires/" + questionnaireId + "/questions", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(question)
        })
        .then(res => { 
            console.log('Save Success');
            $("#result").text("Question sauvegardée !");
            refreshQuestionList(questionnaireId);
        })
        .catch(res => { console.log(res); });
    }

    function saveModifiedQuestion(){
        var question = new Question(
            $("#currenttask2 #questionText").val(),
            $("#currenttask2 #quri").val()
        );
        console.log("PUT");
        console.log(question.uri);
        console.log(JSON.stringify(question));
        fetch(question.uri,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(question)
        })
        .then(res => { console.log('Update Success');  refreshQuestionList();} )
        .catch(res => { console.log(res) });
    }

    function delQuestion(){
        let url = $("#currenttask2 #quri").val();
        if (url) {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE"
            })
            .then(res => { console.log('Delete Success:' + res); })
            .then(() => {
                let questionnaireId = $("#currenttask #turi").val();
                refreshQuestionList(questionnaireId);
            })
            .catch(res => { console.log(res); });
        }
    }
});
