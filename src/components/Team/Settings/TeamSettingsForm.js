import React, {Component} from 'react';
import {
    Form, Button, Input, Dropdown,
} from "formik-semantic-ui";
import {connect, useFormikContext, withFormik, FastField} from "formik";
import {
    Form as SUIForm,
    Image,
    Container,
    Grid,
    Header,
    Loader
} from "semantic-ui-react";
import {REGION_OPTIONS, TEAM_SETTINGS_TITLES, PLATFORM_OPTIONS} from "../../../constants";
import {Formik} from "formik";
import * as Yup from 'yup';
import {TIMEZONES} from "../../../timezones";


class TeamSettingsForm extends Component {

    fileInputRef = React.createRef();

    state = {
        imageSrc: process.env.PUBLIC_URL + "/img/ui/default-img.png",
        logo: false,
        changed: false
    }

    submitLogo = () => {
        if (this.state.changed && this.state.logo) {
            this.props.uploadTeamLogo(this.props.activeTeam, this.state.logo)
        }
    }

    _handleSubmit = (values, formikApi) => {
        this.submitLogo();
        this.props.updateTeamSettings(this.props.activeTeam, values, this.props.settingsTab);
    }


    _handleReset = (values, formikApi) => {
        this.setState({
            changed: false
        })
    }

    validate = (values, props) => {
        return {};
    }

    onFileUpload = e => {
        console.log(e);
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            var obj = URL.createObjectURL(e.target.files[0]);
            this.setState({imageSrc: obj, logo: e.target.files[0], changed: true});
        }

    }

    showLogo = () => {
        if (this.state.changed) {
            return this.state.imageSrc
        }
        return this.props.settings.data.logo
    }

    render() {
        return (
            <Form initialValues={this.props.settings.data}
                  onSubmit={this._handleSubmit}
                  validate={this.validate}
                  onReset={this._handleReset}
                  validateOnBlur={true}>
                <Form.Group widths={"equal"}>
                    <Form.Group grouped className={"field"}>
                        <Input name={"name"} label={"Team Name"}/>
                        <Dropdown name='region'
                                  label='Region'
                                  options={REGION_OPTIONS}
                                  placeholder='Region'/>
                        <hr className="divider"/>
                        <Dropdown name='timezone'
                                  label='Timezone'
                                  inputProps={{search: true, options: TIMEZONES, lazyLoad: true}}/>
                        <Dropdown name='platform'
                                  label='Platform'
                                  options={PLATFORM_OPTIONS}
                                  inputProps={{lazyLoad: true}}
                        />
                    </Form.Group>
                    <input type="file" hidden ref={this.fileInputRef} onChange={this.onFileUpload} name="logo"/>
                    <SUIForm.Field className="logo-field">
                        <label>Logo</label>
                        <Image
                            bordered
                            src={this.props.settings.data.logo ? this.showLogo() : this.state.imageSrc}
                            size='small' circular
                            onClick={() => this.fileInputRef.current.click()}
                        />
                    </SUIForm.Field>
                </Form.Group>
                <Button.Submit>Save</Button.Submit>
                <Button.Reset>Cancel</Button.Reset>
            </Form>
        )
    }
}


export default TeamSettingsForm;
