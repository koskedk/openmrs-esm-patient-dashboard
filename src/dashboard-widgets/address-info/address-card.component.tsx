import React from "react";

export class AddressCard extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p>{this.props.address1}</p>
        <p>{this.props.address2}</p>
        <p>{this.props.cityVillage}</p>
        <p>{this.props.stateProvince}</p>
        <p>{this.props.country}</p>
        <p>{this.props.postalCode}</p>
      </div>
    );
  }
}
