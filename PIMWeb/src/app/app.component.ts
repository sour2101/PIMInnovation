import { Component ,ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng6-toastr';  
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PIM';

  constructor(private translate: TranslateService,private toastr: ToastsManager, vRef: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vRef);
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
