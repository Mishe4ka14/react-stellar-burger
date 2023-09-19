import styles from './profile.module.css'
import { Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { useSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import { addInfo } from '../../services/actions/auth';
import { getUser } from '../../services/actions/auth';
import { useInputHandlers } from '../../hooks/use-input';

export const Profile = ():JSX.Element => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth)

  const {values, handleInputChange, setInputValues} = useInputHandlers({
    name: '', password: '', email: ''
  });

  const setInfo = () => {
    if(user !== null) {
    setInputValues({name: user.name, password: '', email: user.email})
   }
  }

  useEffect(() => {
    dispatch(getUser())
    if(user){
      setInfo()
    }
  }, [])


  const handleChangeInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addInfo(values.name, values.email, values.password))
  }
  return(
        <form className={styles.container} onSubmit={handleChangeInfo}>
          <Input type={'text'} extraClass='mt-4 mb-4' placeholder='Имя' value={values.name} onChange={handleInputChange} name="name" icon={'EditIcon'} />
          <EmailInput extraClass='mt-4 mb-4' placeholder={'Логин'} value={values.email} onChange={handleInputChange} name="email" isIcon={true}/>
          <PasswordInput extraClass='mt-4 mb-4' placeholder={'Пароль'} value={values.password} onChange={handleInputChange} name="password" icon={'EditIcon'}/>
          {(values.name && values.email && values.password) &&
            <div className={styles.btn}>
              <Button htmlType='submit' size="medium">Сохранить</Button>
              <Button htmlType='button' onClick={setInfo} type="secondary" size="medium" >Отмена</Button>
            </div>
          }
        </form>  
      
  )
}