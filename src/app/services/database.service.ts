import {Injectable} from '@angular/core';
import {Message} from '../types/message';
import {AuthService} from './auth.service';

// Every import for firestore must come from the following package.
// All other imports use to older, les performant syntax.
import {
  addDoc, collection, Firestore, CollectionReference,
  doc, DocumentReference, deleteDoc,
  query, getDoc, getDocs, updateDoc, orderBy, where, onSnapshot
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private authService: AuthService, private fireStore: Firestore) {
  }

  async sendMessage(channel: string, message: string): Promise<void> {
    const newMessage = {
      content: message,
      user: this.authService.getUserUID(),
      displayName: this.authService.getDisplayName(),
      profile: this.authService.getProfilePic(),
      date: Date.now()
    };
    await addDoc<Message>(
      this.getCollectionRef<Message>(channel),
      newMessage
    );
  }

  // @ts-ignore
  async retrieveMessagesAsSnapshot(channel: string): Promise<Message[]> {
    const result = await getDocs<Message>(
      query<Message>(
        this.getCollectionRef<Message>(channel),
        orderBy('date')
      )
    );
    return result
      .docs
      .map(d => ({...d.data(), key: d.id}));
  }

  // @ts-ignore
  async retrieveMessageAsSnapshot(channel, id): Promise<Message> {
    const result = await getDoc<Message>(
      this.getDocumentRef<Message>(channel,id)
    );
    return result.data();
  }

  async retrieveMessagesInRealTime(channel: string, observer: ((messages: Message[]) => void)): Promise<void> {
    const handleChange = (change) => observer(change.docs.map(d => ({...d.data(), key: d.id})));

    onSnapshot<Message>(
      query<Message>(
        this.getCollectionRef<Message>(channel),
        orderBy('date')
      ),
      handleChange
    );
  }


  async retrieveMessageInRealTime(channel: string, id: string, observer: ((messages: Message) => void)): Promise<void> {
  }


  async deleteMessage(channel: string, id: string): Promise<void> {
  }

  async updateMessage(channel: string, id: string, msg: Message): Promise<void> {
  }

  // @ts-ignore
  private getCollectionRef<T>(collectionName: string): CollectionReference<T> {
    return collection(this.fireStore, collectionName) as CollectionReference<T>;
  }


  // @ts-ignore
  private getDocumentRef<T>(collectionName: string, id: string): DocumentReference<T> {
    return doc(this.fireStore,`${collectionName}/${id}`) as DocumentReference<T>;
  }
}
