import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/users.models";
import {Message} from "../../shared/models/message.models";
import {AuthService} from "../../shared/services/auth.service";
import {fadeStateTrigger} from "../../shared/animation/fade.animation";
import {Meta, Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    // SEO
    title.setTitle('Вход в систему');
    meta.addTags([
        {name: 'keywords', content: 'логин,вход,система'},
        {name: 'description', content: 'страница для входа в систему'},
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', ''); // была интересная ошибка, когда строка была ниже чем сабскрайб
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({text:'Теперь вы можете зайти в систему', type:'success'})
      } else if (params['accessDenied']) {
        this.showMessage({
            text: 'Для работы с системой необходимо залогиниться',
            type: 'warning'
        })
      }
    });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user[0]) {
          if (user[0].password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill'])
          } else {
            this.showMessage({text:'Пароль не верный', type:'danger'})
          }
        } else {
          this.showMessage({text:'Такого пользователя не существует', type:'danger'})
        }
      });
  }

}
