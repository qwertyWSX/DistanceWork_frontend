export const SuccessRegistration =()=>{
    return(
        <div className=' mx-auto mt-5 w-25'>
        <div class="alert alert-success" role="alert">
         <h5>Вы успешно зарегистрированы!</h5>
        </div>
        <div>
         Для входа в аккаунт перейдите <a href="/Auth" class="alert-link">по ссылке</a> и авторизуйтесь.
        </div>
     </div>
    )
}