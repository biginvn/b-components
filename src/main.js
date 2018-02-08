import Vue from 'vue'
// import axios from 'axios'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.use(axios)
Vue.http.options.emulateJSON = true; 
Vue.http.options.xhr = {withCredentials: true};
Vue.http.options.emulateHTTP = true;


// Components
import BTextField from './themes/ios/TextField.vue'
import BCheckBox from './themes/ios/CheckBox.vue'
import BRadio from './themes/ios/Radio.vue'
import BSwitch from './themes/ios/Switch.vue'
import BSelect from './themes/ios/Select.vue'
import BTextarea from './themes/ios/Textarea.vue'
import BRating from './themes/ios/Rating.vue'
import BZipCode from './themes/ios/ZipCode.vue'
import BButton from './themes/ios/Button.vue'
import BMultiSelect from './themes/ios/MultiSelect.vue'
import BNumericFormatted from './themes/ios/NumericFormatted.vue'
import BToggle from './themes/ios/Toggle.vue'
import BShowPassword from './themes/ios/ShowPassword.vue'
import BDateTimePicker from './themes/ios/DateTimePicker.vue'
import BUpload from './themes/ios/Upload.vue'
import BTaskList from './themes/ios/TaskList.vue'
import BDateAndTime from './themes/ios/DateAndTime.vue'
import BListUpLoaded from './themes/ios/ListUpLoaded.vue'
import BTinymce from './themes/ios/TinyMCE.vue'
import BInputTag from './themes/ios/Tag.vue'
import BModal from './themes/ios/Modal.vue'
import BLoader from './themes/ios/Loader.vue'
// import BLoadingRemoteData from './themes/ios/LoadingRemoteData.vue'
import BTelerikNumberic from './themes/ios/TelerikNumberic.vue'
import BJVectorMap from './themes/ios/JVectorMap.vue'
import BModalMessage from './themes/ios/ModalMessage.vue'
import BChart from './themes/ios/Chart.vue'
import BDataTable from './themes/ios/DataTable.vue'

Vue.component('BTextField', BTextField)
Vue.component('BCheckBox', BCheckBox)
Vue.component('BRadio', BRadio)
Vue.component('BSwitch', BSwitch)
Vue.component('BSelect', BSelect)
Vue.component('BTextarea', BTextarea)
Vue.component('BRating', BRating)
Vue.component('BZipCode', BZipCode)
Vue.component('BButton', BButton)
Vue.component('BMultiSelect', BMultiSelect)
Vue.component('BNumericFormatted', BNumericFormatted)
Vue.component('BToggle', BToggle)
Vue.component('BShowPassword', BShowPassword)
Vue.component('BDateTimePicker', BDateTimePicker)
Vue.component('BUpload', BUpload)
Vue.component('BTaskList', BTaskList)
Vue.component('BListUpLoaded', BListUpLoaded)
Vue.component('BDateAndTime', BDateAndTime)
Vue.component('BTinymce', BTinymce)
Vue.component('BInputTag', BInputTag)
Vue.component('BModal', BModal)
Vue.component('BLoader', BLoader)
// Vue.component('BLoadingRemoteData', BLoadingRemoteData)
Vue.component('BTelerikNumberic', BTelerikNumberic)
Vue.component('BJVectorMap', BJVectorMap)
Vue.component('BModalMessage', BModalMessage)
Vue.component('BChart', BChart)
Vue.component('BDataTable', BDataTable)

