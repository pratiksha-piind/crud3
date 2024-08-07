import * as React from 'react';
//  import styles from './Crud3.module.scss';
import type { ICrud3Props } from './ICrud3Props';
import { TextField, PrimaryButton,Dropdown, IDropdownOption} from '@fluentui/react';

export interface IStates{
  EmployeeID: string;
  EmployeeName: string;
  EmployeeEmailID: string;
  ProjectStatus:string;
}

export default class Crud3 extends React.Component<ICrud3Props, IStates> {
  constructor(props:ICrud3Props){
    super(props);
    this.state={
      EmployeeID: '',
      EmployeeName: '',
      EmployeeEmailID: '',
      ProjectStatus:'',
    }
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const { EmployeeID,EmployeeName, EmployeeEmailID,ProjectStatus } = this.state;

    const payload = { 
      // "__metadata": {"type":"SP.Data.SharePointListItem"},
      ID:EmployeeID, 
      Name:EmployeeName,
      Email_x002d_ID:EmployeeEmailID, 
      ProjectStatus:ProjectStatus,
    };
    console.log(payload);
    
    const response = await fetch(`https://piindext.sharepoint.com/sites/SPFX/_api/web/lists/GetByTitle('SharePoint')/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json;odata=verbose',
        'X-RequestDigest': '0x984EAD7BABCDCE1B501CCCC45A5449151AC7245CB81FF9EE2A237699FAC122E91058AF963FDDD66EFF149A5F98005E61229B355D972E6588E386DC7A158F8FBA,07 Aug 2024 10:45:53 -0000'
      },
      body: JSON.stringify(payload),
    });

    console.log({response});
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
      this.setState({
        EmployeeID: '',
        EmployeeName: '',
        EmployeeEmailID: '',
        ProjectStatus: '',
      });
    } else {
      console.error('Error:', response.statusText);
    }

    this.setState({
      EmployeeID: '',
      EmployeeName: '',
      EmployeeEmailID: '',
    });
  }

  private handleIDChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    event.preventDefault();
    this.setState({ EmployeeID: newValue || '' });
  
};

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    event.preventDefault();
    this.setState({ EmployeeName: newValue || '' });
    
};

private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
  event.preventDefault();  
  this.setState({ EmployeeEmailID: newValue || '' });
};

private handleProjectStateChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
  //  event.preventDefault();
  this.setState({ ProjectStatus: option?.key as string || '' });
};

  public render(): React.ReactElement<ICrud3Props>{
    const { EmployeeID,EmployeeName, EmployeeEmailID,ProjectStatus } = this.state;
    //Define options for the Project States dropdown
    const projectStateOptions: IDropdownOption[] = [
      { key: 'Not Started', text: 'Not Started' },
      { key: 'In Progress', text: 'In Progress' },
      { key: 'Completed', text: 'Completed' },
    ];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <TextField
          label="ID"
          value={EmployeeID}
          onChange={this.handleIDChange}
          required
        />

        <TextField
          label="Name"
          value={EmployeeName}
          onChange={this.handleNameChange}
          required
        />
        <TextField
          label="Email-ID"
          value={EmployeeEmailID}
          onChange={this.handleEmailChange}
          type="email"
          required
        />

          <Dropdown
            label="Project State"
            options={projectStateOptions}
            selectedKey={ProjectStatus}
            onChange={this.handleProjectStateChange}
            required
          />
        <PrimaryButton text="Submit" type="submit" />
         </form>
      </div>
    );
   }
}
