import styled from 'styled-components'
import { MainText } from '../../../UI/main-text'
import { useNavigate } from 'react-router-dom'
import { DecorativeBlock } from '../ui/decorative-block'
import { PageBackground } from '../ui/page-background'
import { Link } from '../ui/link'
import { ReactNode } from 'react'

interface AuthLayoutProps {
    register?: boolean
    children?: ReactNode
}

export const AuthLayout = ({ register, children}: AuthLayoutProps) => {
    const navigate = useNavigate()
    return (
        <PageBackground>
            <DecorativeBlock>
                <TextWrapper>
                    <MainText $fontweight={400} $fontsize='58px'>
                        <span>
                            {(() => {
                                switch (true) {
                                    case register:
                                        return `Создать
                                                аккаунт`;
                                    default:
                                        return `Войти
                                                в аккаунт`;
                                }
                            })()}
                        </span>
                    </MainText>
                    <Link onClick={() => { register ? navigate('/login') : navigate('/register/step1') }}>
                        <span>
                            {(() => {
                                switch (true) {
                                    case register:
                                        return "Уже есть аккаунт? Войти";
                                    default:
                                        return "Нет аккаунта? Зарегистрироваться";
                                }
                            })()}
                        </span>
                    </Link>
                </TextWrapper>
                {children}
            </DecorativeBlock>
        </PageBackground>
    )
}

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    justify-content: flex-start;
  `