import * as React from "react";
import {
  ActionEventArgs,
  Day,
  DragAndDrop,
  ExcelExport,
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
import { PersonModel } from "../../../Api/Models/personModel";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Avatar, Link, ListItemText, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { SiteRoute } from "../../../Typings/Enums/siteRoute";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Person } from "@mui/icons-material";
import { AjaxOption, CustomDataAdaptor, DataManager } from "@syncfusion/ej2-data";
import { CalendarsApi } from "../../../Api/calendarsApi";
import {
  CalendarModelMapped,
  CalendarModelToScheduleComponentData,
  ScheduleComponentDataToCalendarModel,
} from "../../../Api/Models/calendarModel";
import { DepartmentCalendarSearchParam } from "../../../Typings/Enums/departmentCalendarSearchParam";

loadRussianCalendarLocale();

interface DepartmentCalendarProps {
  token: string;
  departmentManager: PersonModel;
  departmentPersons: PersonModel[];

  //fixme hardcode
  eventsToShow: Array<undefined | "Отпуск" | "Командировка" | "Учеба">;
}

export class DepartmentCalendar extends React.PureComponent<DepartmentCalendarProps> {
  static defaultProps = {
    eventsToShow: [undefined, "Отпуск", "Командировка", "Учеба"],
  };

  private _dataToUpdate: {
    changedRecords: CalendarModelMapped[] | null;
    addedRecord: CalendarModelMapped | null;
    personIdToAdd: string | null;
    deletedRecords: CalendarModelMapped[] | null;
  } = { changedRecords: null, addedRecord: null, personIdToAdd: null, deletedRecords: null };

  private scheduleObj: ScheduleComponent | null = null;

  /* RELOAD CALENDAR DATA */
  //FIXME: DRY, after data update reload is done twice, fix this!!!
  private _reloadCalendarData = (option: AjaxOption) => {
    console.log("reload department calendar");

    const searchParams = new URLSearchParams();
    if (this.scheduleObj) {
      searchParams.set(DepartmentCalendarSearchParam.department, this.props.departmentManager.department.name);
      searchParams.set(DepartmentCalendarSearchParam.from, this.scheduleObj.activeView.startDate().toJSON());
      searchParams.set(DepartmentCalendarSearchParam.to, this.scheduleObj.activeView.endDate().toJSON());
    }

    CalendarsApi.GetForDepartment(
      this.props.departmentManager.id!,
      searchParams,
      this.props.token,
      (data, request) => {
        const preparedRequest = extend({}, option, { httpRequest: request });
        const dataMapped = data.map((calendar) => CalendarModelToScheduleComponentData(calendar));
        option.onSuccess?.({ result: dataMapped, size: dataMapped.length }, preparedRequest);
      },
      (request) => {
        const preparedRequest = extend({}, option, { httpRequest: request });
        option.onFailure?.(preparedRequest);
      }
    );
  };

  //fixme move to file
  private resourceData: { Subject: string; Color: string }[] = [
    { Subject: "Отпуск", /*Id: 1,*/ Color: "#00B5B8" },
    { Subject: "Командировка", /*Id: 2,*/ Color: "#2196F3" },
    { Subject: "Учеба", /*Id: 3,*/ Color: "#DA6868" },
  ];

  private dataManager: DataManager = new DataManager({
    adaptor: new CustomDataAdaptor({
      getData: async (option: AjaxOption) => {
        this._reloadCalendarData(option);
      },

      // TODO: remove syncfusion library, полное говно
      batchUpdate: async (option: AjaxOption) => {
        const addedRecords = this._dataToUpdate.addedRecord ? [this._dataToUpdate.addedRecord] : [];
        const changedRecords = this._dataToUpdate.changedRecords ?? [];
        const deletedRecords = this._dataToUpdate.deletedRecords ?? [];

        const addedRecordsMapped = addedRecords.map((r) =>
          ScheduleComponentDataToCalendarModel(r, true, this.props.departmentManager)
        );
        const changedRecordsMapped = changedRecords.map((r) =>
          ScheduleComponentDataToCalendarModel(r, false, this.props.departmentManager)
        );
        const deletedRecordsIds = deletedRecords.map((r) => r.Id).filter((id): id is string => id !== undefined);
        for (let record of addedRecordsMapped) {
          await CalendarsApi.Create(record, this.props.token);
        }
        for (let record of changedRecordsMapped) {
          await CalendarsApi.Update(record, this.props.token);
        }
        for (let id of deletedRecordsIds) {
          await CalendarsApi.Delete(id, this.props.token);
        }

        this._reloadCalendarData(option); //FIXME: causes double reload, find a way to fix this

        // Reset old data
        this._dataToUpdate = { changedRecords: null, deletedRecords: null, addedRecord: null, personIdToAdd: null };
      },
    }),
    crossDomain: true,
  });

  constructor(props: DepartmentCalendarProps) {
    super(props);
  }

  private _onActionBegin = (action: ActionEventArgs): void => {
    console.log("calendar action: ", action.requestType);
    switch (action.requestType) {
      case "eventChange":
        this._dataToUpdate.changedRecords = (action.changedRecords as CalendarModelMapped[]) ?? null;
        break;
      case "eventCreate":
        if (this._dataToUpdate.personIdToAdd) {
          this._dataToUpdate.addedRecord = action.addedRecords
            ? (action.addedRecords[0] as CalendarModelMapped) ?? null
            : null;

          if (this._dataToUpdate.addedRecord) {
            this._dataToUpdate.addedRecord.PersonId = this._dataToUpdate.personIdToAdd;
            this._dataToUpdate.addedRecord.Person = { id: this._dataToUpdate.personIdToAdd }; //FIXME ESLINT IGNORE
          }
        }
        break;
      case "eventRemove":
        this._dataToUpdate.deletedRecords = (action.deletedRecords as CalendarModelMapped[]) ?? null;
        break;
    }
  };

  private _onEventRendered = (args: any) => {
    let eventType = this.resourceData.find((d) => d.Subject === args.data.Subject);
    if (!args.element || !eventType) {
      return;
    }
    args.element.style.backgroundColor = eventType.Color;
  };
  /* // TODO BETTER EXCEL EXPORTING
      if (args.requestType === "toolbarItemRendering") {
      let exportItem = {
        align: "Right",
        showTextOn: "Both",
        text: "Экспорт в Excel",
        cssClass: "e-excel-export",
        click: this.onExportClick.bind(this),
      };
      args.items?.push(exportItem);
    }*/

  /*private onExportClick(): void {
    // TODO BETTER EXCEL EXPORTING
    const exportFields: ExportFieldInfo[] = [
      { name: "Id", text: "Id" },
      { name: "Subject", text: "Summary" },
      { name: "StartTime", text: "Start Date" },
      { name: "EndTime", text: "End Date" },
    ];
    const exportValues: ExportOptions = { fieldsInfo: exportFields };
    console.log("export");
    this.scheduleObj.exportToExcel();
  }*/

  /* TODO: EVENT SORT BY TYPES
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
  }*/

  public render(): JSX.Element {
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
                resourceHeaderTemplate={this._resourceHeaderTemplate.bind(this)}
                eventSettings={{ dataSource: this.dataManager }}
                ref={(t) => (this.scheduleObj = t)}
                editorTemplate={this._editorTemplate}
                showQuickInfo={false}
                group={{ enableCompactView: false, resources: ["Persons"] }}
                actionBegin={this._onActionBegin}
                eventRendered={this._onEventRendered}
              >
                <ResourcesDirective>
                  <ResourceDirective
                    field="PersonId"
                    name="Persons"
                    dataSource={this.props.departmentPersons}
                    idField="id"
                  />
                  <ResourceDirective
                    field="Subject"
                    dataSource={this.resourceData}
                    idField="Subject"
                    colorField="Color"
                  />
                </ResourcesDirective>

                <ViewsDirective>
                  <ViewDirective option="TimelineMonth" />
                </ViewsDirective>
                <Inject services={[Day, TimelineViews, Month, TimelineMonth, Resize, DragAndDrop, ExcelExport]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _resourceHeaderTemplate(props: ResourceDetails): JSX.Element {
    let person: PersonModel = props.resourceData as PersonModel;
    return (
      <div className="template-wrap">
        <div>
          <Avatar
            component="div"
            sx={(theme) => ({
              mr: 2,
              height: 60,
              width: 60,
              fontSize: "48px",
              border: `solid 1px ${theme.palette.primary.main}`,
              background: theme.palette.background.paper,
            })}
            src={person.avatarUrl}
          >
            <Person color="primary" fontSize="inherit" />
          </Avatar>
          <div>
            <ListItemText
              primary={
                <Link
                  component={RouterLink}
                  to={`${SiteRoute.persons}/${person.id}/${SiteRoute.profile}`}
                  variant="inherit"
                  color="inherit"
                  underline="hover"
                  sx={{
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                >
                  {<b>{person.fullName}</b>}
                </Link>
              }
              secondary={
                <Typography variant="inherit" sx={{ fontSize: "0.65rem" }}>
                  {person.position.name}
                  <br />
                  {person.department.name}
                </Typography>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  private _editorTemplate = (props: (CalendarModelMapped & { [key: string]: any }) | undefined) => {
    this._dataToUpdate.personIdToAdd = props?.PersonId ?? null;
    /*FIXME REFACTOR THIS SHIT*/
    return props !== undefined ? (
      <table className="custom-event-editor" style={{ width: "100%", marginTop: "24px" }}>
        <tbody>
          <tr>
            <td className="e-textlabel" style={{ paddingBottom: "24px", paddingRight: "8px" }}>
              Комментарий
            </td>
            <td colSpan={4} style={{ paddingBottom: "24px" }}>
              <TextBoxComponent
                id="ManagerComment"
                placeholder="Комментарий"
                data-name="ManagerComment"
                name="ManagerComment"
                className="e-field"
                style={{ width: "100%" }}
                value={props.ManagerComment}
              />
            </td>
          </tr>
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
                value={new Date(props.StartTime || props.startTime)}
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
                value={new Date(props.EndTime || props.endTime)}
                className="e-field"
              />
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div />
    );
  };
}
