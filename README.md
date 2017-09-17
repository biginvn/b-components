# b-components
```
npm install --save-dev biginvn/b-components
```
<div class="container">
        <template id="main-page">
            <div class="container">
                <div class="jumbotron">
                    <h1>Vue Components</h1>
                </div>
                <div class="row">
                    <figure class="col-md-6">
                        <h4 class="mb-3">Text Field</h4>
                        <p>
                            <b-text-field name="minh" id="asdasd" type="email" class-name="minh class" v-model="input.name" placeholder="Input yout text" label="Label"></b-text-field>
                        </p>
                        <p>{{ input.name }}</p>

                        <button type="button" class="btn btn-success" @click="input.name='Test'">Update model</button>
                        <button type="button" class="btn btn-success" @click="input.name=''">Empty</button>
                    </figure>

                    <figure class="col-md-6">
                        <h4 class="mb-3">Checkbox</h4>
                        <p>
                            <b-check-box class-name="minh class" v-model="input.checkbox" bind-value="USA" label="USA"></b-check-box>
                            <b-check-box class-name="minh class" v-model="input.checkbox" bind-value="Thai Lan" label="Thai Lan"></b-check-box>
                            <b-check-box class-name="minh class" v-model="input.checkbox" bind-value="VN" label="VN"></b-check-box>
                        </p>
                        <p>{{ input.checkbox }}</p>
                        <p>
                            <button type="button" class="btn btn-success" @click="input.checkbox=['USA']">Only USA</button>
                            <button type="button" class="btn btn-success" @click="input.checkbox=[]">Reset all</button>
                        </p>
                        <br>

                        <p>
                            <b-check-box class-name="minh class" v-model="input.checkboxByValue" bind-value="USA" label="USA"></b-check-box>
                        </p>
                        <p>{{ input.checkboxByValue }}</p>

                        <button type="button" class="btn btn-success" @click="input.checkboxByValue = true">USA</button>


                    </figure>

                    <figure class="col-md-6">
                        <h4 class="mb-3">Radio</h4>
                        <p>
                            <b-radio name="minh" id="radio-usa" class-name="testing-b-radio" v-model="input.radio" value="USA" label="USA"></b-radio>
                            <b-radio name="minh" id="radio-vn" class-name="testing-b-radio" v-model="input.radio" value="VN" label="VN"></b-radio>
                            <b-radio name="minh" id="radio-thai" class-name="testing-b-radio" v-model="input.radio" value="Thai Lan" label="Thai Lan"></b-radio>
                        </p>
                        <p>{{ input.radio }}</p>

                        <button type="button" class="btn btn-success" @click="input.radio='VN'">VN only</button>
                        <button type="button" class="btn btn-success" @click="input.radio=null">Null</button>
                    </figure>

                    <figure class="col-md-6">
                        <h4 class="mb-3">Switch</h4>
                        <p>

                            <b-switch name="minh" id="USA" class-name="testing-b-switch" v-model="input.switch" bind-value="USA" label="USA"></b-switch>
                            <label for="USA">USA</label>
                        </p>
                        <p>
                            <b-switch name="minh" class-name="testing-b-switch" v-model="input.switch" bind-value="VN" id="VN"></b-switch>
                            <label for="VN">VN</label>
                        </p>
                        <p>
                            <b-switch name="minh" class-name="testing-b-switch" v-model="input.switch" bind-value="Thai Lan" id="Thai Lan"></b-switch>
                            <label for="Thai Lan">Thai Lan</label>
                        </p>
                            
                        </p>
                        <p>{{ input.switch }}</p>
                        <p>                            
                            <button type="button" class="btn btn-success" @click="input.switch=['VN']">VN only</button>
                            <button type="button" class="btn btn-success" @click="input.switch=[]">Empty</button>
                        </p>
                        
                        <p>
                            <b-switch name="minh" class-name="testing-b-switch" v-model="input.switchBool"></b-switch>
                        </p>
                        <p>{{ input.switchBool }}</p>
                        <p>
                            <button type="button" class="btn btn-success" @click="input.switchBool = true">True</button>
                            <button type="button" class="btn btn-success" @click="input.switchBool = false">False</button>
                        </p>
                    </figure>

                    <figure class="col-md-6">
                        <h4 class="mb-3">Selectbox</h4>
                        <p>
                            <b-select item-text = "name" item-val = "code" label = "Select country" name="minh" class-name="testing-b-select" v-model="input.select" :list="list"></b-select>
                        </p>
                        <p>{{ input.select }}</p>

                        <button type="button" class="btn btn-success" @click="input.select='USA'">Select USA</button>
                        <button type="button" class="btn btn-success" @click="input.select=null">Null</button>
                    </figure>

                    <figure class="col-md-6">
                        <h4 class="mb-3">Textarea</h4>
                        <p>
                            <b-textarea placeholder = "Because ..." label = "Why I'm the best" name="minh" class-name="testing-b-textarea" v-model="input.textarea"></b-textarea>
                        </p>
                        <p>{{ input.textarea }}</p>

                        <button type="button" class="btn btn-success" @click="input.textarea='Awesome components'">Update</button>
                        <button type="button" class="btn btn-success" @click="input.textarea=null">Null</button>
                    </figure>

                    <figure class="col-md-6">
                        <h4 class="mb-3">Rating</h4>
                        <p>
                            <b-rating rate-max = "5" disabled = "disabled2" class-name="testing-b-rating" v-model="input.rating"></b-rating>
                        </p>
                        <p>{{ input.rating }}</p>

                        <button type="button" class="btn btn-success" @click="input.rating=5">5 stars</button>
                        <button type="button" class="btn btn-success" @click="input.rating=3">Update to 3 stars</button>
                        <button type="button" class="btn btn-success" @click="input.rating=7">More 5 stars (7)</button>
                        <button type="button" class="btn btn-success" @click="input.rating=null">Null</button>
                    </figure>


                </div>
            </div>
        </template>
        <div id="app"></div>
    </div>
    <script>
    var vm = new Vue({
        el: '#app',
        data: {
            input: {
                name: 'Please input some text here',
                checkbox: [],
                checkboxByValue : null,
                radio : null,
                switch : [],
                switchBool : true,
                select : null,
                textarea : null,
                rating : null,
            },
            list : [
                { code : 'VN', name : 'Viet Nam'},
                { code : 'USA', name : 'United States'},
                { code : 'CAM', name : 'Campuchia'}
            ]
        },
        template: '#main-page'
    });
    </script>