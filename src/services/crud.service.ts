export class CrudService {
  user;
  static userEndPoint = 'http://localhost:3000/users';

   async postSignUpInfo(userInput) {
    const res = await fetch(CrudService.userEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(userInput)
    });
    const json = await res.json();
    console.log(json);
    CrudService.user = json
  }
}
