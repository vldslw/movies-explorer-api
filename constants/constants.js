const OK = 200;
const urlPattern = /^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[/?#]\S*)?$/;
const emailPattern = /^([A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/;
const namePattern = /^[A-Za-zА-Яа-я\s-]+$/;
const authNeededMsg = 'Необходима авторизация';
const serverErrorMsg = 'На сервере произошла ошибка';
const incorrectLoginMsg = 'Неправильная почта или пароль';
const incorrectDataMsg = 'Переданы некорректные данные';
const userIdNotFoundMsg = 'Пользователь по указанному id не найден';
const existingEmailMsg = 'Пользователь с таким email уже существует';
const invalidMovieIdMsg = 'Передан невалидный id фильма';
const movieIdNotFoundMsg = 'Фильм с указанным id не найден';
const cannotDeleteMovieMsg = 'Нельзя удалить чужой фильм';
const pageNotFoundMsg = 'Страница по указанному маршруту не найдена';
const incorrectEmailMsg = 'Введите корректный адрес email';
const incorrectLinkMsg = 'Введите корректную ссылку';

module.exports = {
  OK,
  urlPattern,
  emailPattern,
  namePattern,
  authNeededMsg,
  serverErrorMsg,
  incorrectLoginMsg,
  incorrectDataMsg,
  userIdNotFoundMsg,
  existingEmailMsg,
  invalidMovieIdMsg,
  movieIdNotFoundMsg,
  cannotDeleteMovieMsg,
  pageNotFoundMsg,
  incorrectEmailMsg,
  incorrectLinkMsg,
};
