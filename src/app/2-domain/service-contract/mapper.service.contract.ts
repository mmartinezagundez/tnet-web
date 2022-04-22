export abstract class IMapper<Entity, Model> {
    abstract fromEntityToModel(param: Entity): Model;
    abstract fromModelToEntity(param: Model): Entity;
    abstract fromEntityListToModelList(param: Entity[]): Model[];
    abstract fromModelListToEntityList(param: Model[]): Entity[];
}