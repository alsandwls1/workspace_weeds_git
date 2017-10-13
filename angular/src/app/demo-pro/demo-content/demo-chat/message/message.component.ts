import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../../service/chat.service';
// import { AuthService } from '../../../../services/auth.service';
import { ChatMessage } from '../../../../model/chat-message.model';
import { MemberService } from '../../../../service/member.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private memberService:MemberService) {
    var id = localStorage.getItem("email");
    memberService.getInfo(id)

    // this.ownEmail = user.email;
    this.isOwnMessage = this.ownEmail === this.userEmail;
  }


  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }

}
