'use babel';

import GetterCppCreatorView from './getter-cpp-creator-view';
import { CompositeDisposable } from 'atom';

export default {

  getterCppCreatorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.getterCppCreatorView = new GetterCppCreatorView(state.getterCppCreatorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.getterCppCreatorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'getter-cpp-creator:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.getterCppCreatorView.destroy();
  },

  serialize() {
    return {
      getterCppCreatorViewState: this.getterCppCreatorView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()){
      let selection = editor.getSelectedText()
      let arrayLines = selection.split('\n');

      if(selection.includes("private:") && selection.includes("public:")){
        var count=0;
        for(count=0; count < arrayLines.length; count++){
          if(arrayLines[count].includes("private:")){
            break;
          }
        }
        count++;
        var myList = [];

        for(;count < arrayLines.length; count++){
          if(arrayLines[count] == "public:"){
            break;
          }else{
            var tempType = "";
            let currLine = arrayLines[count];
            var i=0;
            while(currLine[i] == ' '){
              i++;
            }
            for(;i < currLine.length; i++){
              if(currLine[i] == ' '){
                break;
              }else{
                tempType = tempType + currLine[i];
              }
            }
            i++;
            while(currLine[i] == ' '){
              i++;
            }

            var tempName = "";
            for(;i < currLine.length; i++){
              if(currLine[i] == ';' || currLine[i] == '=' || currLine[i] == ' '){
                break;
              }else{
                tempName = tempName + currLine[i];
              }
            }
            var singleObj = {};
            singleObj['type'] = tempType;
            singleObj['name'] = tempName;
            if(singleObj.name != ""){
              myList.push(singleObj);
            }
          }
        }
        var tempSTR=selection + "\n\n";
        var countList=0;
        for(countList=0; countList< myList.length; countList++){
          var t = myList[countList].type;
          var n = myList[countList].name;
          tempSTR = tempSTR + "\t" + t + " get" + n + "(){\n\t  return " + n + ";\n\t}\n";
        }
        editor.insertText(tempSTR);
      }else if(!(selection.includes("private:")) && selection.includes("public:")){
        var count;
        var myList = [];

        for(count=0;count < arrayLines.length; count++){
          if(arrayLines[count] == "public:"){
            break;
          }else{
            var tempType = "";
            let currLine = arrayLines[count];
            var i=0;
            while(currLine[i] == ' '){
              i++;
            }
            for(;i < currLine.length; i++){
              if(currLine[i] == ' '){
                break;
              }else{
                tempType = tempType + currLine[i];
              }
            }
            i++;
            while(currLine[i] == ' '){
              i++;
            }

            var tempName = "";
            for(;i < currLine.length; i++){
              if(currLine[i] == ';' || currLine[i] == '=' || currLine[i] == ' '){
                break;
              }else{
                tempName = tempName + currLine[i];
              }
            }
            var singleObj = {};
            singleObj['type'] = tempType;
            singleObj['name'] = tempName;
            if(singleObj.name != ""){
              myList.push(singleObj);
            }
          }
        }
        var tempSTR=selection + "\n\n";
        var countList=0;
        for(countList=0; countList< myList.length; countList++){
          var t = myList[countList].type;
          var n = myList[countList].name;
          tempSTR = tempSTR + "\t" + t + " get" + n + "(){\n\t  return " + n + ";\n\t}\n";
        }
        editor.insertText(tempSTR);
      }else if(!(selection.includes("private:")) && !(selection.includes("public:"))) {
        var count=0;
        var myList = [];
        for(count=0;count < arrayLines.length;count++){
          var tempType = "";
          let currLine = arrayLines[count];
          var i=0;
          while(currLine[i] == ' '){
            i++;
          }
          for(;i < currLine.length; i++){
            if(currLine[i] == ' '){
              break;
            }else{
              tempType = tempType + currLine[i];
            }
          }
          i++;
          while(currLine[i] == ' '){
            i++;
          }

          var tempName = "";
          for(;i < currLine.length; i++){
            if(currLine[i] == ';' || currLine[i] == '=' || currLine[i] == ' '){
              break;
            }else{
              tempName = tempName + currLine[i];
            }
          }
          var singleObj = {};
          singleObj['type'] = tempType;
          singleObj['name'] = tempName;
          if(singleObj.name != ""){
            myList.push(singleObj);
          }
        }
        var tempSTR=selection + "\n\n";
        var countList=0;
        for(countList=0; countList< myList.length; countList++){
          var t = myList[countList].type;
          var n = myList[countList].name;
          tempSTR = tempSTR + "\t" + t + " get" + n + "(){\n\t  return " + n + ";\n\t}\n";

        }
        editor.insertText(tempSTR);
      }
    }
  }
};
