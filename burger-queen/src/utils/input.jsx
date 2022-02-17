import React, {useState}from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {Label, Input, GroupInput, LeyendaError, Icon} from '../style-components/elementos/Form'

const ComponentInput = ({icon,type, label, placeholder, name, error, expReg, estado, changeState, eye }) => {
  
  const [valid, setValid] = useState('');

  const  onChange = (e) =>{
    changeState(e.target.value)
  }

  const validation = () => {
    if (expReg) {
      if(expReg.test(estado)) {
        console.log('true')
        setValid('true')
      } else {
        setValid('false')
        console.log('false')
      }
    }
  }



  return (
        <div className="form-section">
            <Label htmlFor={name}>{label}</Label>
            <GroupInput>
              {icon}
              <Input
                type={type}
                name={name}
                placeholder={placeholder}
                id={name}
                value={estado}
                onChange={onChange}
                onKeyUp = {validation}
                onBlur = {validation}
                valid={valid}
              />
              {eye}
            </GroupInput>
            <LeyendaError valid={valid}>{error}</LeyendaError>
          </div>
    )
}

export default ComponentInput