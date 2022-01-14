import * as React from "react";
import {
  Day,
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ResourceDetails,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineMonth,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";

import { extend } from "@syncfusion/ej2-base";
import { loadRussianCalendarLocale } from "../calendarLocalization";
import { CalendarData } from "../PersonalCalendar/datasource";
import { PersonModel } from "../../../Api/Models/personModel";
import { Predicate, Query } from "@syncfusion/ej2-data";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

loadRussianCalendarLocale();

interface DepartmentCalendarProps {
  initialData: CalendarData[];
  persons: PersonModel[];
  onDataUpdate?: (newData: CalendarData[]) => void;

  //fixme hardcode
  eventsToShow: Array<"Отпуск" | "Командировка" | "Учеба">;
}

export class DepartmentCalendar extends React.PureComponent<DepartmentCalendarProps> {
  private data: any;
  private scheduleObj: any;
  /*private employeeData: Record<string, any>[] = [
    { Text: "Alice", Id: 1, GroupId: 1, Color: "#bbdc00", Designation: "Content writer" },
    { Text: "Nancy", Id: 2, GroupId: 2, Color: "#9e5fff", Designation: "Designer" },
    { Text: "Robert", Id: 3, GroupId: 1, Color: "#bbdc00", Designation: "Software Engineer" },
    { Text: "Robson", Id: 4, GroupId: 2, Color: "#9e5fff", Designation: "Support Engineer" },
    { Text: "Laura", Id: 5, GroupId: 1, Color: "#bbdc00", Designation: "Human Resource" },
    { Text: "Margaret", Id: 6, GroupId: 2, Color: "#9e5fff", Designation: "Content Analyst" },
  ];*/

  //fixme move to file
  private resourceData: { Subject: string; Color: string }[] = [
    { Subject: "Отпуск", /*Id: 1,*/ Color: "#00B5B8" },
    { Subject: "Командировка", /*Id: 2,*/ Color: "#2196F3" },
    { Subject: "Учеба", /*Id: 3,*/ Color: "#DA6868" },
  ];

  constructor(props: DepartmentCalendarProps) {
    super(props);
  }
  textToBgColor = (text: string): string => {
    let hash = 0;
    let i;
    /* eslint-disable no-bitwise */
    for (i = 0; i < text.length; i += 1) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    return color;
  };

  onEventRendered(args: any) {
    if (this.props.onDataUpdate) {
      this.props.onDataUpdate(this.data);
    }
    let eventType = this.resourceData.find((d) => d.Subject === args.data.Subject);
    if (!args.element || !eventType) {
      return;
    }
    args.element.style.backgroundColor = eventType.Color;
  }

  /*  componentDidMount() {
    if (this.props.eventsToShow.length > 0) {
      let predicate: Predicate | null = null;
      this.props.eventsToShow.forEach((event) => {
        if (predicate) {
          predicate = predicate.or("Subject", "equal", event);
        } else {
          predicate = new Predicate("Subject", "equal", event);
        }
      });
      if (predicate) {
        this.scheduleObj.eventSettings.query = new Query().where(predicate);
      }
    }
  }*/

  /*  private getEmployeeName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }

  private getEmployeeImage(value: ResourceDetails): string {
    return this.getEmployeeName(value).toLowerCase();
  }

  private getEmployeeDesignation(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData.Designation as string;
  }*/

  private resourceHeaderTemplate(props: ResourceDetails): JSX.Element {
    console.log("person: ", props.resourceData);

    return (
      <div className="template-wrap">
        <div className="employee-category">
          {/*<div className={"employee-image " + this.getEmployeeImage(props)}></div>
          <div className="employee-name">{this.getEmployeeName(props)}</div>
          <div className="employee-designation">{this.getEmployeeDesignation(props)}</div>*/}
        </div>
      </div>
    );
  }

  public render(): JSX.Element {
    this.data = extend([], this.props.initialData, undefined, true);
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper drag-sample-wrapper">
            <div className="schedule-container">
              <ScheduleComponent
                width="100%"
                height="650px"
                locale="ru"
                cssClass="demo"
                resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                eventSettings={{ dataSource: this.data }}
                eventRendered={this.onEventRendered.bind(this)}
                editorTemplate={this.editorTemplate.bind(this)}
                showQuickInfo={false}
                group={{ enableCompactView: false, resources: ["Persons"] }}
              >
                <ResourcesDirective>
                  <ResourceDirective field="PersonId" name="Persons" dataSource={this.props.persons} idField="Id" />
                  <ResourceDirective
                    field="Subject"
                    name="EventTypes"
                    dataSource={this.resourceData}
                    idField="Subject"
                    colorField="Color"
                  />
                </ResourcesDirective>

                <ViewsDirective>
                  <ViewDirective option="TimelineMonth" />
                </ViewsDirective>
                <Inject services={[Day, TimelineViews, Month, TimelineMonth, Resize, DragAndDrop]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }

  editorTemplate(props: any) {
    /*FIXME REFACTOR THIS SHIT*/
    return props !== undefined ? (
      <table className="custom-event-editor" style={{ width: "100%", marginTop: "24px" }}>
        <tbody>
          {/* <tr>
            <td className="e-textlabel" style={{ paddingBottom: "32px", paddingRight: "16px" }}>
              Summary
            </td>
            <td colSpan={4}>
              <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: "100%" }} />
            </td>
          </tr>*/}
          <tr>
            <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
              Тип
            </td>
            <td colSpan={4} style={{ paddingBottom: "24px" }}>
              <DropDownListComponent
                id="Summary"
                placeholder="Выберите тип"
                data-name="Subject"
                name="Subject"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["Учеба", "Командировка", "Отпуск"]}
                value={"Учеба"}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
              С
            </td>
            <td colSpan={4} style={{ paddingBottom: "24px" }}>
              <DatePickerComponent
                locale="ru"
                format="dd/MM/yy"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel" style={{ paddingRight: "8px" }}>
              До
            </td>
            <td colSpan={4}>
              <DatePickerComponent
                locale="ru"
                format="dd/MM/yy"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              />
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  }
}
