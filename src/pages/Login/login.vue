<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isChange}" @click="isChange=true">短信登录</a>
          <a href="javascript:;" :class="{on: !isChange}" @click="isChange=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form >
          <div :class="{on: isChange}">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
                name="phone"
                v-validate="{required:true,regex: /^1\d{10}$/}"
              />
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              <button
                :disabled="!isRightPhone"
                class="get_verification"
                :class="{isRight:isRightPhone}"
                @click.prevent="send"
              >{{time>0 ? `已发送验证码（${time}）` :'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input
                type="text"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
                name="code"
                v-validate="{required: true,regex: /^\d{6}$/}"
              />
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isChange}">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-validate="'required'"
                  v-model="name"
                  name="name"
                />
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input
                  :type="isShowPassword ? 'text' : 'password'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                  name="pwd"
                  v-validate="'required'"
                />

                <div
                  class="switch_button"
                  :class="isShowPassword ? 'on' : 'off' "
                  @click="isShowPassword = !isShowPassword"
                >
                  <div class="switch_circle" :class="{right:isShowPassword}"></div>
                  <span class="switch_text">{{isShowPassword}}</span>
                </div>
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                  name="captcha"
                  v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}"
                />

                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  ref="captcha"
                  @click="updateSrc"
                />
                <span
                  style="color: red;"
                  v-show="errors.has('captcha')"
                >{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="submit">{{$t("login_login")}}</button>
        </form>
        <a href="javascript:;" class="about_us">{{$t("login_aboutUs")}}</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2" @click="$router.replace('/profile')"></i>
      </a>
      <button @click="changeLanguage">切换语言</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { log } from "util"
 import { Toast, MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      isChange: true,
      phone: "",
      isShowPassword: false,
      time: 0,
      code: "",
      name: "",
      pwd: "",
      captcha: ""
    };
  },
  methods: {
    async send() {
      this.time = 59;
      const timeId = setInterval(() => {
        this.time--;
        if (this.time <=0) {
          clearInterval(timeId);
        }
      }, 1000);
      const result = this.$API.phoneCode(this.phone);
      if (result.code === 0) {
        Toast('验证码短信已发送');
        
      } else {
        MessageBox('提示',result.msg || '发送失败');
        this.time = 0;
      }
    },
    async submit() {
      let names;
      if (this.isChange) {
        names = ["phone", "code"];
      } else {
        names = ["name", "pwd", "captcha"];
      }
      const success = await this.$validator.validateAll(names);
      let result;

      if (success) {
        const { code, name, pwd, captcha, phone, isChange } = this;
        if (isChange) {
          result =await this.$API.phoneSms({ phone, code });
        } else {
          result =await this.$API.userLogin({ name, pwd, captcha });
           this.updateSrc();
            this.captcha = "";
        }
        console.log(result)
        if (result.code === 0) {
          console.log(1)
          //如果成功 将用户保存到state中
          const user = result.data;
          this.$store.dispatch("saveUser", user);
          //跳转到个人中心
          this.$router.replace("/profile");
        }
      }
    },
    updateSrc() {
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();

     
    },
    changeLanguage(){
      const loacle =this.$i18n.locale==='en'? 'zh_CN':'en'
      this.$i18n.locale=loacle
       localStorage.setItem('locale_key', loacle)
    }
  },
  computed: {
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.isRight {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(27px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
