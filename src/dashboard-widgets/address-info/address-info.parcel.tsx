import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Address } from "./address.component";
import { Patient } from "./domain/patients/patient";

class AddressInfoParcel extends React.Component<any, any> {
  state = {
    patient: null,
    showForm: false,
    editLabel: "edit address"
  };

  componentWillMount(): void {
    this.loadPatient();
  }

  loadPatient = (uuid?: string) => {
    const queryParams = `
      custom:(uuid,display,
      identifiers:(identifier,uuid,preferred,location:(uuid,name),
      identifierType:(uuid,name,format,formatDescription,validator)),
      person:(uuid,display,gender,birthdate,dead,age,deathDate,birthdateEstimated,
      causeOfDeath,preferredName:(uuid,preferred,givenName,middleName,familyName),
      attributes,preferredAddress:(uuid,preferred,address1,address2,cityVillage,longitude,
      stateProvince,latitude,country,postalCode,countyDistrict,address3,address4,address5
      ,address6)))
    `.replace(/\s/g, "");

    fetch(
      `/openmrs/ws/rest/v1/patient/${this.props.patientUuid}?v=${queryParams}`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch patient ${this.props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(p => {
        this.setState({ patient: p });
        this.setState({
          showForm: false,
          editLabel: "edit address"
        });
      });
  };
  showName = () => {
    let currnetPatient: Patient = this.state.patient;
    return `${currnetPatient.person.preferredName.familyName} ${currnetPatient.person.preferredName.givenName}`;
  };

  showForm = event => {
    event.preventDefault();
    this.setState({
      showForm: !this.state.showForm,
      editLabel:
        this.state.editLabel === "edit address" ? "cancel edit" : "edit address"
    });
  };

  render() {
    return this.state.patient ? (
      <div>
        <button onClick={this.showForm}>{this.state.editLabel}</button>
        <Address
          onSaved={this.loadPatient}
          patient={this.state.patient}
          editMode={this.state.showForm}
        ></Address>
      </div>
    ) : (
      <div>loading</div>
    );
  }
}

export default singleSpaReact({
  React,
  ReactDOM,
  rootComponent: AddressInfoParcel,
  suppressComponentDidCatchWarning: true
});
