import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'isNull',
})
export class IsNullPipe implements PipeTransform {
    transform(value: string, replace) {
        if (value == null || value == "")
            return replace;
        return value;
    }
}
