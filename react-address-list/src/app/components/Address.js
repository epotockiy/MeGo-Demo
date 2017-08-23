import React from 'react';
import { GoogleProvider } from 'leaflet-geosearch';
// import {lookup}  from 'geosearch';
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export class Address extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.provider = new GoogleProvider({
      params: {
        key: 'AIzaSyBGBD7aGmB5kqSa5Mjd2b0MTSWs02Mcxs4',
      },
    });

    this.state = {
      cityInput: ''
    };
  }

  handleInputChange(event, field) {
    this.setState({
      [field]: event.target.value
    });

    if (event.target.value.length > 2) {
      this.provider.search({ query: event.target.value })
        .then(res => {
          console.log(res);
        });

      /*lookup(event.target.value, function(error, result) {
        console.log(error, result);
      });*/
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for='city'>City</Label>
          <Input
            id='city'
            type='text'
            placeholder='Enter a city...'
            value={this.state.cityInput}
            onChange={(event) => this.handleInputChange(event, 'cityInput')}
          />
        </FormGroup>
      </Form>
    );
  }
}
