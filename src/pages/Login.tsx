import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  CalendarDays,
  IndianRupee,
  UserRound,
  LogIn,
  UserPlus,
  Check,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'
import './Login.css'

export default function Login() {
  const { user, signIn, signUp } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const [isSignUp, setIsSignUp] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [rememberMe, setRememberMe] = useState(true)

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!email.trim()) {
      setError(t('required'))
      return
    }

    if (!password) {
      setError(t('required'))
      return
    }

    if (isSignUp && password !== confirmPassword) {
      setError(t('login_passwordMismatch'))
      return
    }

    if (isSignUp && password.length < 6) {
      setError(t('login_passwordMinLength'))
      return
    }

    setSubmitting(true)

    if (isSignUp) {
      const { error: signUpError, session } = await signUp(
        email.trim(),
        password
      )

      setSubmitting(false)

      if (signUpError) {
        setError(signUpError)
        return
      }

      if (session) {
        return
      }

      setMessage(t('login_accountCreated'))

      setPassword('')
      setConfirmPassword('')

      return
    }

    const { error: signInError } = await signIn(
      email.trim(),
      password
    )

    setSubmitting(false)

    if (signInError) {
      setError(signInError)
      return
    }
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)

    setError('')
    setMessage('')

    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="shramika-login-page">

      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <section className="login-left">

        <div className="left-content">

          {/* BRAND */}

          <div className="brand-header">

            <div className="brand-mark">
              <BookOpen
                size={42}
                strokeWidth={2}
              />
            </div>

            <div className="brand-text">

              <h1>
                {t('appName')}
              </h1>

              <p>
                {t('login_brandSubtitle')}
              </p>

            </div>

          </div>


          {/* HERO TEXT */}

          <div className="hero-text">

            <h2>

              {t('login_heroTitle')}

              <br />

              {t('login_heroTitleSecond')}{' '}

              <span>
                {t('login_heroTitleHighlight')}
              </span>

            </h2>

            <p>
              {t('login_heroDescription')}
            </p>

          </div>


          {/* FARMER IMAGE */}

          <div className="farmer-image-container">

            <img
              src="/images/farmer-illustration.png"
              alt="Farm workers"
              className="farmer-image"
            />

          </div>


          {/* FEATURE BAR */}

          <div className="feature-bar">

            <div className="feature-box">

              <Users size={28} />

              <span>
                {t('login_featureLabourers')}
              </span>

            </div>


            <div className="feature-divider" />


            <div className="feature-box">

              <CalendarDays size={28} />

              <span>
                {t('login_featureAttendance')}
              </span>

            </div>


            <div className="feature-divider" />


            <div className="feature-box">

              <IndianRupee size={28} />

              <span>

                {t('login_featureWagesPayments')}

              </span>

            </div>


            <div className="feature-divider" />


            <div className="feature-box">

              <UserRound size={28} />

              <span>
                {t('login_featureFieldOwners')}
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <section className="login-right">


        {/* LANGUAGE SWITCHER */}

        <div className="language-switcher">

          <button
            type="button"
            className={
              language === 'en'
                ? 'language-active'
                : 'language-inactive'
            }
            onClick={() => setLanguage('en')}
          >
            English
          </button>


          <button
            type="button"
            className={
              language === 'te'
                ? 'language-active'
                : 'language-inactive'
            }
            onClick={() => setLanguage('te')}
          >
            తెలుగు
          </button>

        </div>


        {/* LOGIN CARD */}

        <div className="login-card">


          {/* LOGO */}

          <div className="card-logo">

            <div className="card-logo-icon">

              <BookOpen
                size={34}
                strokeWidth={2}
              />

            </div>

          </div>


          {/* APP NAME */}

          <h2 className="card-brand-name">
            {t('appName')}
          </h2>


          {/* TITLE */}

          <div className="login-title">

            <h3>

              {isSignUp
                ? t('login_createAccount')
                : t('login_welcomeBack')}

            </h3>

            <p>

              {isSignUp
                ? t('login_createSubtitle')
                : t('login_loginSubtitle')}

            </p>

          </div>


          {/* FORM */}

          <form
            className="shramika-form"
            onSubmit={handleSubmit}
          >


            {/* EMAIL */}

            <div className="input-group">

              <label htmlFor="email">

                {t('login_email')}

              </label>

              <div className="input-box">

                <Mail size={22} />

                <div className="input-content">

                  <span>
                    {t('login_email')}
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder={t(
                      'login_emailPlaceholder'
                    )}
                    required
                    autoComplete="email"
                  />

                </div>

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label htmlFor="password">

                {t('login_password')}

              </label>

              <div className="input-box">

                <Lock size={22} />

                <div className="input-content">

                  <span>
                    {t('login_password')}
                  </span>

                  <input
                    id="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder={t(
                      'login_passwordPlaceholder'
                    )}
                    required
                    minLength={6}
                    autoComplete={
                      isSignUp
                        ? 'new-password'
                        : 'current-password'
                    }
                  />

                </div>


                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >

                  {showPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}

                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            {isSignUp && (

              <div className="input-group">

                <label htmlFor="confirmPassword">

                  {t('login_confirmPassword')}

                </label>

                <div className="input-box">

                  <Lock size={22} />

                  <div className="input-content">

                    <span>
                      {t('login_confirmPassword')}
                    </span>

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? 'text'
                          : 'password'
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder={t(
                        'login_confirmPasswordPlaceholder'
                      )}
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />

                  </div>


                  <button
                    type="button"
                    className="eye-button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label="Toggle confirm password visibility"
                  >

                    {showConfirmPassword ? (
                      <EyeOff size={21} />
                    ) : (
                      <Eye size={21} />
                    )}

                  </button>

                </div>

              </div>

            )}


            {/* REMEMBER ME / FORGOT PASSWORD */}

            {!isSignUp && (

              <div className="login-options">

                <button
                  type="button"
                  className="remember-option"
                  onClick={() =>
                    setRememberMe(!rememberMe)
                  }
                >

                  <span
                    className={
                      rememberMe
                        ? 'remember-box checked'
                        : 'remember-box'
                    }
                  >

                    {rememberMe && (
                      <Check size={14} />
                    )}

                  </span>

                  <span>
                    {t('login_rememberMe')}
                  </span>

                </button>


                <button
                  type="button"
                  className="forgot-button"
                  onClick={() => {

                    setMessage(
                      t('login_passwordResetNext')
                    )

                    setError('')

                  }}
                >

                  {t('login_forgotPassword')}

                </button>

              </div>

            )}


            {/* ERROR */}

            {error && (

              <div className="login-message error">
                {error}
              </div>

            )}


            {/* SUCCESS */}

            {message && (

              <div className="login-message success">
                {message}
              </div>

            )}


            {/* MAIN BUTTON */}

            <button
              type="submit"
              className="main-login-button"
              disabled={submitting}
            >

              {submitting ? (

                t('login_pleaseWait')

              ) : (

                <>

                  {isSignUp ? (
                    <UserPlus size={22} />
                  ) : (
                    <LogIn size={22} />
                  )}

                  {isSignUp
                    ? t('login_createAccount')
                    : t('login_button')}

                </>

              )}

            </button>

          </form>


          {/* OR */}

          <div className="or-divider">

            <span />

            <p>
              {t('login_or')}
            </p>

            <span />

          </div>


          {/* CREATE ACCOUNT */}

          <button
            type="button"
            className="create-account-button"
            onClick={switchMode}
          >

            {isSignUp ? (
              <LogIn size={22} />
            ) : (
              <UserPlus size={22} />
            )}

            {isSignUp
              ? t('login_backToLogin')
              : t('login_createYourAccount')}

          </button>


          {/* BOTTOM TEXT */}

          <p className="bottom-text">

            {isSignUp
              ? t('login_alreadyHaveAccount')
              : t('login_newToApp')}

            {' '}

            <button
              type="button"
              onClick={switchMode}
            >

              {isSignUp
                ? t('login_loginHere')
                : t('login_createYourAccount')}

            </button>

          </p>

        </div>

      </section>

    </div>
  )
}