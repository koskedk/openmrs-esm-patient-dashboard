import React from "react";
import { Patient } from "./domain/patients/patient";
import { AddressCard } from "./address-card.component";
import { AddressForm } from "./address-form.component";

export class Address extends React.Component<any, any> {
  refershAddress = uuid => {
    this.props.onSaved(uuid);
  };

  showAddress = (patient: Patient, editMode: boolean) => {
    const address = { ...patient.person.preferredAddress };

    return editMode ? (
      <div>
        <AddressForm
          onSubmitted={this.refershAddress}
          patientUuid={patient.uuid}
          {...address}
        />
      </div>
    ) : (
      <div>
        <AddressCard {...address} />
      </div>
    );
  };

  render() {
    return (
      <div>{this.showAddress(this.props.patient, this.props.editMode)} </div>
    );
  }
}
