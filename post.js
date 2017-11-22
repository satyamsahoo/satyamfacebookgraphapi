$(document).ready(function(){
  //your access token 
  var token = "EAACEdEose0cBABf1NTxHb2MOIeZAcYSZBZAnwOozgZCPJA9XPgYnv1Wu7uQkMeu5gtEZCd1KJxtRdZBtVaqlRD1KdjtWn5O3ZCRYYynMnMsGGvSi8K35iNpMZApQKjLRIVOejn7RZC9AG61S5oYhlsNrPqVkbbnzdO4C3OUZBSEm3m0abfjgVcSxoExyHPMBy22HKyRZCvjKgBLqgZDZD";
  //When get status link is clicked
  function getFacebookStatus(){
    //collase the profile part
    $(".fbprofile").css("visibility","collapse");
    //calling the graph api through ajax
    $.ajax('https://graph.facebook.com/v2.11/me/posts?access_token=' +token,{
      //on success
      success : function(response){
        $.each(response.data,function(i,val){
          $(".message"+i).text(response.data[i].message);
          $(".story"+i).text(response.data[i].story);
          $(".time"+i).text(response.data[i].created_time);
        });
      },
      //on error
      error : function(request,errorType,errorMessage){
        alert(errorMessage + ": Check your token.");
        $(".fbprofile").hide();
        $(".fbstatus").hide();
      },
      //on timeout
      timeout : 10000,
      //before execution finishes
      beforeSend : function(){
        $(".loader").css("visibility","visible");
      },
      //after execution finishes
      complete : function(){
        $(".loader").hide();
        $(".fbstatus").css("visibility","visible");
        $(".fbprofile").hide();
      }
    });
  }
  //When get profile link is clicked
  function getFacebookProfile(){
    //collase the status part
    $(".fbstatus").css("visibility","collapse");
    //calling the graph api through ajax
    $.ajax('https://graph.facebook.com/v2.11/me?fields=id,name,picture,hometown,gender,email,location,birthday,work&access_token=' +token,{
      //on success
      success : function(response){
        $(".name").text(response.name);
        $(".email").text(response.email);
        $(".location").text(response.location.name);
        $(".gender").text(response.gender);
        $(".hometown").text(response.hometown.name);
        $(".work").text(response.work[0].employer.name);
        $(".birthday").text(response.birthday);
        $(".pic").attr("src",response.picture.data.url);
      },
      //on error
      error : function(request,errorType,errorMessage){
        $(".fbprofile").css("visibility","collapse");
        $(".fbstatus").css("visibility","collapse");
        alert(errorMessage + ": Check your token.");
      },
      //on timeout
      timeout : 10000,
      //before execution finishes
      beforeSend : function(){
        $(".loader").css("visibility","visible");
      },
      //after execution finishes
      complete : function(){
        $(".loader").hide();
        $(".fbprofile").show();
        $(".fbprofile").css("visibility","visible");
      }
    });

  }
  //call the functions
  $(".status").on('click',getFacebookStatus);
  $(".profile").on('click',getFacebookProfile);

});
