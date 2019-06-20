import React from "react";
import axios from "axios";

export class AddressForm extends React.Component<any, any> {
  state = {
    patientUuid: "",
    uuid: "",
    address1: "",
    address2: "",
    cityVillage: "",
    stateProvince: "",
    country: "",
    postalCode: "",
    submitForm: false,
    submitFormLabel: "Save"
  };

  componentDidMount(): void {
    this.setState({ ...this.props });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      submitForm: true,
      submitFormLabel: "Saving..."
    });

    axios
      .post(
        `/openmrs/ws/rest/v1/person/${this.state.patientUuid}/address/${this.state.uuid}`,
        this.getAddress()
      )
      .then(response => {
        this.setState({
          submitForm: false,
          submitFormLabel: "Save"
        });
        this.props.onSubmitted(this.state.patientUuid);
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  getAddress = () => {
    let {
      address1,
      address2,
      cityVillage,
      stateProvince,
      country,
      postalCode
    } = this.state;

    return {
      address1,
      address2,
      cityVillage,
      stateProvince,
      country,
      postalCode
    };
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.address1}
            onChange={event => this.setState({ address1: event.target.value })}
            placeholder="Address Line 1"
          />
          <input
            type="text"
            value={this.state.address2}
            onChange={event => this.setState({ address2: event.target.value })}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            value={this.state.cityVillage}
            onChange={event =>
              this.setState({ cityVillage: event.target.value })
            }
            placeholder="City/Village"
          />
          <input
            type="text"
            value={this.state.stateProvince}
            onChange={event =>
              this.setState({ stateProvince: event.target.value })
            }
            placeholder="State/Province"
          />
          <input
            type="text"
            value={this.state.country}
            onChange={event => this.setState({ country: event.target.value })}
            placeholder="Country"
          />
          <input
            type="text"
            value={this.state.postalCode}
            onChange={event =>
              this.setState({ postalCode: event.target.value })
            }
            placeholder="Postal Code"
          />
          <br />
          <button type="submit" disabled={this.state.submitForm}>
            {this.state.submitFormLabel}
          </button>
        </form>
      </div>
    );
  }
}
