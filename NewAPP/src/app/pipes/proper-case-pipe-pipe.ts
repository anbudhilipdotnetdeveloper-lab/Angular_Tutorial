import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'properCase'
  //,pure: false
})
export class ProperCasePipePipe implements PipeTransform {

  transform(value: string,reverse: boolean): string {
    if(typeof(value)=='string'){
      let word =reverse ==false? value.toUpperCase():value.toLowerCase();
      return (reverse==false? word[0].toLowerCase() : word[0].toUpperCase()) + word.substr(1);
  }else{
    return value;
  }
}

}
