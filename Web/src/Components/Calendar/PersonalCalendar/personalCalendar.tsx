import React from "react";
import {
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineMonth,
  ViewDirective,
  ViewsDirective,
  Year,
} from "@syncfusion/ej2-react-schedule";
//FIXME REMOVE THIS LATER
//import the loadCldr from ej2-base
import { extend } from "@syncfusion/ej2-base";
import { CalendarData } from "./datasource";
import { PopupOpenEventArgs } from "@syncfusion/ej2-schedule/src/schedule/base/interface";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Predicate, Query } from "@syncfusion/ej2-data";
import { loadRussianCalendarLocale } from "../calendarLocalization";

loadRussianCalendarLocale();

/**
 * Schedule local data sample
 */
interface PersonalCalendarProps {
  initialData: CalendarData[];
  onDataUpdate?: (newData: CalendarData[]) => void;

  //fixme hardcode
  eventsToShow: Array<"Отпуск" | "Командировка" | "Учеба">;
  isPreview: boolean;
}

export class PersonalCalendar extends React.PureComponent<PersonalCalendarProps> {
  static defaultProps = {
    isPreview: false,
  };

  private data: any;
  private scheduleObj: any;

  //fixme move to file
  private resourceData: Record<string, any>[] = [
    { Text: "Отпуск", /*Id: 1,*/ Color: "#00B5B8" },
    { Text: "Командировка", /*Id: 2,*/ Color: "#2196F3" },
    { Text: "Учеба", /*Id: 3,*/ Color: "#DA6868" },
  ];

  constructor(props: PersonalCalendarProps) {
    super(props);
    this.data = extend([], this.props.initialData, undefined, true);
  }

  onEventRendered(args: any) {
    if (this.props.onDataUpdate) {
      this.props.onDataUpdate(this.data);
    }

    //let categoryColor = args.data.CategoryColor;
    //if (!args.element || !categoryColor) {
    //  return;
    //}
    //args.element.style.backgroundColor = categoryColor;
  }

  componentDidMount() {
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
  }

  //todo use this for event filters
  private onChange(): void {
    /* let checkBoxes: CheckBox[] = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
    checkBoxes.forEach((checkBoxObj: CheckBox) => {
      if (checkBoxObj.checked) {
        if (predicate) {
          predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
        } else {
          predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
        }
      }
    });*/
    //scheduleObj.eventSettings.query = new Query().where(predicate);
  }

  private popupOpen(e: PopupOpenEventArgs) {
    if (e.type === "Editor") {
      //let statusElement = e.element.querySelector("#EventType");
      //statusElement.setAttribute("name", "EventType");
    }
  }

  render() {
    return (
      <div className="schedule-control-section">
        <div className="col-lg-12 control-section">
          <div className="control-wrapper">
            {/*selectedDate={new Date(2022, 0, 30)}*/}
            <ScheduleComponent
              width="100%"
              readonly={this.props.isPreview}
              height={this.props.isPreview ? "175px" : "650px"}
              ref={(t) => (this.scheduleObj = t)}
              eventSettings={{ dataSource: this.data }}
              eventRendered={this.onEventRendered.bind(this)}
              locale="ru"
              popupOpen={this.popupOpen.bind(this)}
              editorTemplate={this.editorTemplate.bind(this)}
              showQuickInfo={false}
            >
              {this.props.isPreview ? (
                <ViewsDirective>
                  <ViewDirective option="TimelineMonth" />
                </ViewsDirective>
              ) : (
                <ViewsDirective>
                  <ViewDirective option="Month" showWeekend={true} />
                  <ViewDirective option="Year" />
                </ViewsDirective>
              )}

              <ResourcesDirective>
                <ResourceDirective field="Subject" dataSource={this.resourceData} idField="Text" colorField="Color" />
              </ResourcesDirective>

              <Inject services={[Month, Year, TimelineMonth, Resize, DragAndDrop]} />
            </ScheduleComponent>
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
          {!this.props.isPreview && props.ManagerComment && (
            <tr>
              <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
                Комментарий менеджера
              </td>
              <td colSpan={4} style={{ paddingBottom: "24px" }}>
                {props.ManagerComment}
              </td>
            </tr>
          )}
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
