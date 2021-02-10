import { Component, ElementRef, Input, OnChanges, Renderer2, ViewEncapsulation } from "@angular/core";
import JSONFormatter from "json-formatter-js";

@Component({
    selector: "app-json-formatter",
    templateUrl: "./json-formatter.component.html",
    styleUrls: ["./json-formatter.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class JsonFormatterComponent implements OnChanges {
    @Input() json: any;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        if (this.json) {
            const formatter = new JSONFormatter(this.json, 1, { theme: "dark" });
            this.renderer.appendChild(this.elementRef.nativeElement, formatter.render());
        }
    }
}
