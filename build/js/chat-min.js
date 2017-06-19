function Chat(){var i={};return i.debug=!1,i.talk={},i.configuration={behaviour:{autoScroll:!0,autoDetectLanguage:!1,autoScrollAfterFirstAnswer:!0,autoResize:!0,defaultLang:"en",showTypingDots:!0,useEmoji:!0,useInputs:!0,useLanguages:!1},ids:{mainChat:"chat",answerPrefix:"answer-"},classes:{answer:"chat-answer",answerWrap:"chat-answer-select",bubbleWrap:"chat-bubble",bubble:"chat-bubble-msg",bubbleBot:"chat-bubble-msg-me",bubbleVisitor:"chat-bubble-msg-visitor",chatWrap:"chat-wrap",emojiPrefix:"em em-"},times:{delay:{overall:0,dots:700,botsTalk:1200,showAnswer:200},speed:{dotsFadeInOut:400,chatBlockFadeIn:400,scrollingSpeed:700}}},i.talkPosition="init",i.browserLanguage="",i.usedLang="",i.heightChat=0,i.heightAnswers=0,i.init=function(i){var t=this;this.browserLanguage=navigator.language||navigator.userLanguage,void 0!==i.ajax&&$.getJSON(i.ajax,function(i){t.parseSettings(i),t.generateHtml(),t.parseTalks(i),setTimeout(function(){t.botTalks()},t.configuration.times.delay.overall)})},i.parseSettings=function(i){var t=this;if(void 0===i)throw"JSON settings not found..";void 0!==i.config&&(void 0!==i.config.debug&&(this.debug=1==i.config.debug),void 0!==i.config.behaviour&&$.each(i.config.behaviour,function(i,a){void 0!==t.configuration.behaviour[i]&&(t.configuration.behaviour[i]=a)}),void 0!==i.config.classes&&$.each(i.config.classes,function(i,a){void 0!==t.configuration.classes[i]&&(t.configuration.classes[i]=a)}),void 0!==i.config.ids&&$.each(i.config.ids,function(i,a){void 0!==t.configuration.ids[i]&&(t.configuration.ids[i]=a)}),void 0!==i.config.times&&$.each(i.config.times,function(i,a){$.each(a,function(a,s){if(void 0!==t.configuration.times[i][a]){if(!(s>=0))throw"A configuration value for times."+i+"."+a+" < 0 is not allowed";t.configuration.times[i][a]=s}})})),0==this.configuration.behaviour.showTypingDots&&(this.configuration.times.delay.dots=0),1==this.configuration.autoScrollAfterFirstAnswer&&(this.autoScroll=!0),0==this.autoScroll&&(this.configuration.speed.scrollingSpeed=0)},i.handleLanguage=function(){1==this.configuration.behaviour.useLanguages&&(this.chatLog("Language usage activated"),1==this.configuration.behaviour.autoDetectLanguage?this.usedLang=this.browserLanguage.split("-")[0]:this.usedLang=this.configuration.behaviour.defaultLang,this.chatLog("Switched to '"+this.usedLang+"' language"))},i.parseTalks=function(i){if(this.handleLanguage(),void 0===i.talk)throw"There is no talk declaration in JSON file...";if(1==this.configuration.behaviour.useLanguages&&""!=this.usedLang){if(void 0===i.talk[this.usedLang])throw"Language '"+this.usedLang+"' could not be found...";if(void 0===i.talk[this.usedLang].init)throw"There is no init point for talk in language "+this.usedLang+"...";this.talk=i.talk[this.usedLang],this.chatLog("Lanugage found")}else{if(void 0===i.talk.init)throw"There is no init point for talk...";this.talk=i.talk}},i.generateHtml=function(){if($("#"+this.configuration.ids.mainChat),0)throw"Container #"+this.configuration.ids.mainChat+" not found.";var i='<div class="'+this.configuration.classes.chatWrap+'"></div>',t='<div class="'+this.configuration.classes.answerWrap+'"></div>';$("#"+this.configuration.ids.mainChat).append(i,t),this.heightAnswers=$("."+this.configuration.classes.answerWrap).height(),this.heightChat=$("#"+this.configuration.ids.mainChat).height()},i.botTalks=function(){this.chatLog("- Bot starts talking on "+this.talkPosition+"..");var i=this;if(void 0===this.talk[this.talkPosition])return this.chatLog(" - No more answers available"),!1;if(void 0===this.talk[this.talkPosition].talks)throw"No bot talks found";this.talk[this.talkPosition].talks.forEach(function(t,a){var s=i.configuration.times.delay.dots+i.configuration.times.delay.botsTalk*(a+1);setTimeout(function(){i.newChatBubble("bot",t)},s)});var t=this.talk[this.talkPosition].talks.length*(this.configuration.times.delay.botsTalk+this.configuration.times.delay.dots)+this.configuration.times.delay.showAnswer;setTimeout(function(){if(i.showAnswers(),1==i.configuration.behaviour.autoScroll){if(1==i.configuration.behaviour.autoScrollAfterFirstAnswer&&"init"==i.talkPosition)return i.chatLog("Skip scrolling on first reply.."),!1;i.chatLog("Scrolling..."),$("body").animate({scrollTop:$("."+i.configuration.classes.bubble+":last-of-type").position().top},this.configuration.times.scrollingSpeed)}},t)},i.newChatBubble=function(i,t){this.chatLog("- -- * Add new Bubble for "+i+" with "+t);var a=this,s="bot"==i?this.configuration.classes.bubbleBot:this.configuration.classes.bubbleVisitor,o=this.configuration.behaviour.showTypingDots?"...":this.formatContent(t),n=$("<div class='"+this.configuration.classes.bubbleWrap+"'><div class='"+this.configuration.classes.bubble+" "+s+"'>"+o+"</div></div>");if(n.hide(),$("#"+this.configuration.ids.mainChat+" ."+this.configuration.classes.chatWrap).append(n),n.fadeIn(this.configuration.times.speed.chatBlockFadeIn),1==this.configuration.behaviour.autoResize){var e=n.height();this.expandChat(e)}this.configuration.behaviour.showTypingDots&&setTimeout(function(){n.find("."+a.configuration.classes.bubble).fadeOut(a.configuration.times.speed.dotsFadeInOut,function(){$(this).html(a.formatContent(t)).fadeIn(a.configuration.times.speed.dotsFadeInOut)})},this.configuration.times.delay.dots)},i.showAnswers=function(){this.chatLog("- Show answers for "+this.talkPosition+"...");var i=this,t="";if(void 0!==this.talk[this.talkPosition]&&void 0!==this.talk[this.talkPosition].answers){$("."+this.configuration.classes.answerWrap).html(""),this.talk[this.talkPosition].answers.forEach(function(a,s){i.chatLog("- -- - "+a),t=t+"<a href='javascript:;' class='"+i.configuration.classes.answer+"' id='"+i.configuration.ids.answerPrefix+s+"'>"+i.formatContent(a)+"</a>"});var a=$("<div>"+t+"</div>").click(function(t){var a=$(t.target).context;i.answer(a.id.substr(i.configuration.ids.answerPrefix.length),a.innerHTML)});$("."+this.configuration.classes.answerWrap).append(a),1==this.configuration.behaviour.autoResize&&(this.heightAnswers=a.height(),this.expandChat(this.heightAnswers))}else this.chatLog("<< No other answers available..")},i.answer=function(i,t){var a="";if(void 0===this.talk[this.talkPosition])return!1;if(void 0===this.talk[this.talkPosition].next[i])throw"There is no answer for "+i+" in "+this.talkPosition;a=this.talk[this.talkPosition].next[i],this.chatLog(">> Answer "+i+" of Talk position "+this.talkPosition+" selected.. Next: '"+a+"'.");var s=$('<div class="'+this.configuration.classes.bubbleWrap+'"><div class="'+this.configuration.classes.bubble+" "+this.configuration.classes.bubbleVisitor+'">'+t+"</div></div>").hide();if($("#"+this.configuration.ids.mainChat+" ."+this.configuration.classes.chatWrap).append(s),s.fadeIn(),$("."+this.configuration.classes.answerWrap).fadeOut().html("").fadeIn(),1==this.configuration.behaviour.autoResize){var o=s.height();this.expandChat(o)}this.talkPosition=a,this.botTalks()},i.formatContent=function(i){var t=/:input:([A-z]+):/;if(inputFields=t.exec(i),null!=inputFields&&(i=i.replace(inputFields[0],'<input type="text" name="'+inputFields[1]+'" placeholder="Start typing...">')),1==this.configuration.behaviour.useEmoji){var a=/:emoji:([A-z]+):/;emojiFields=a.exec(i),null!=emojiFields&&(i=i.replace(emojiFields[0],'<i class="'+this.configuration.classes.emojiPrefix+"-"+emojiFields[1]+'"></i>'))}return i},i.expandChat=function(i){this.chatLog("++++++++ Resize chat by "+i+"px"),1==this.configuration.behaviour.autoResize&&(this.heightChat=this.heightChat+i,$("#"+this.configuration.ids.mainChat).css("height",this.heightChat+"px"))},i.chatLog=function(i){1==this.debug&&console.log(i)},i}