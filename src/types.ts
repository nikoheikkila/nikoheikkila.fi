/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    GatsbyImageData: any;
    JSON: any;
};

export type AvifOptions = {
    readonly lossless: InputMaybe<Scalars["Boolean"]>;
    readonly quality: InputMaybe<Scalars["Int"]>;
    readonly speed: InputMaybe<Scalars["Int"]>;
};

export type BlurredOptions = {
    /** Force the output format for the low-res preview. Default is to use the same format as the input. You should rarely need to change this */
    readonly toFormat: InputMaybe<ImageFormat>;
    /** Width of the generated low-res preview. Default is 20px */
    readonly width: InputMaybe<Scalars["Int"]>;
};

export type BooleanQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["Boolean"]>;
    readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Boolean"]>>>;
    readonly ne: InputMaybe<Scalars["Boolean"]>;
    readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Boolean"]>>>;
};

export type DateQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["Date"]>;
    readonly gt: InputMaybe<Scalars["Date"]>;
    readonly gte: InputMaybe<Scalars["Date"]>;
    readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Date"]>>>;
    readonly lt: InputMaybe<Scalars["Date"]>;
    readonly lte: InputMaybe<Scalars["Date"]>;
    readonly ne: InputMaybe<Scalars["Date"]>;
    readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Date"]>>>;
};

export type Directory = Node & {
    readonly __typename?: "Directory";
    readonly absolutePath: Scalars["String"];
    readonly accessTime: Scalars["Date"];
    readonly atime: Scalars["Date"];
    readonly atimeMs: Scalars["Float"];
    readonly base: Scalars["String"];
    readonly birthTime: Scalars["Date"];
    /** @deprecated Use `birthTime` instead */
    readonly birthtime: Maybe<Scalars["Date"]>;
    /** @deprecated Use `birthTime` instead */
    readonly birthtimeMs: Maybe<Scalars["Float"]>;
    readonly changeTime: Scalars["Date"];
    readonly children: ReadonlyArray<Node>;
    readonly ctime: Scalars["Date"];
    readonly ctimeMs: Scalars["Float"];
    readonly dev: Scalars["Int"];
    readonly dir: Scalars["String"];
    readonly ext: Scalars["String"];
    readonly extension: Scalars["String"];
    readonly gid: Scalars["Int"];
    readonly id: Scalars["ID"];
    readonly ino: Scalars["Float"];
    readonly internal: Internal;
    readonly mode: Scalars["Int"];
    readonly modifiedTime: Scalars["Date"];
    readonly mtime: Scalars["Date"];
    readonly mtimeMs: Scalars["Float"];
    readonly name: Scalars["String"];
    readonly nlink: Scalars["Int"];
    readonly parent: Maybe<Node>;
    readonly prettySize: Scalars["String"];
    readonly rdev: Scalars["Int"];
    readonly relativeDirectory: Scalars["String"];
    readonly relativePath: Scalars["String"];
    readonly root: Scalars["String"];
    readonly size: Scalars["Int"];
    readonly sourceInstanceName: Scalars["String"];
    readonly uid: Scalars["Int"];
};

export type DirectoryAccessTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryAtimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryBirthTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryChangeTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryCtimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryModifiedTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryMtimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type DirectoryConnection = {
    readonly __typename?: "DirectoryConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<DirectoryEdge>;
    readonly group: ReadonlyArray<DirectoryGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<Directory>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type DirectoryConnectionDistinctArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryConnectionGroupArgs = {
    field: DirectoryFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type DirectoryConnectionMaxArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryConnectionMinArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryConnectionSumArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
    readonly __typename?: "DirectoryEdge";
    readonly next: Maybe<Directory>;
    readonly node: Directory;
    readonly previous: Maybe<Directory>;
};

export enum DirectoryFieldsEnum {
    AbsolutePath = "absolutePath",
    AccessTime = "accessTime",
    Atime = "atime",
    AtimeMs = "atimeMs",
    Base = "base",
    BirthTime = "birthTime",
    Birthtime = "birthtime",
    BirthtimeMs = "birthtimeMs",
    ChangeTime = "changeTime",
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    Ctime = "ctime",
    CtimeMs = "ctimeMs",
    Dev = "dev",
    Dir = "dir",
    Ext = "ext",
    Extension = "extension",
    Gid = "gid",
    Id = "id",
    Ino = "ino",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    Mode = "mode",
    ModifiedTime = "modifiedTime",
    Mtime = "mtime",
    MtimeMs = "mtimeMs",
    Name = "name",
    Nlink = "nlink",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    PrettySize = "prettySize",
    Rdev = "rdev",
    RelativeDirectory = "relativeDirectory",
    RelativePath = "relativePath",
    Root = "root",
    Size = "size",
    SourceInstanceName = "sourceInstanceName",
    Uid = "uid",
}

export type DirectoryFilterInput = {
    readonly absolutePath: InputMaybe<StringQueryOperatorInput>;
    readonly accessTime: InputMaybe<DateQueryOperatorInput>;
    readonly atime: InputMaybe<DateQueryOperatorInput>;
    readonly atimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly base: InputMaybe<StringQueryOperatorInput>;
    readonly birthTime: InputMaybe<DateQueryOperatorInput>;
    readonly birthtime: InputMaybe<DateQueryOperatorInput>;
    readonly birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly changeTime: InputMaybe<DateQueryOperatorInput>;
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly ctime: InputMaybe<DateQueryOperatorInput>;
    readonly ctimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly dev: InputMaybe<IntQueryOperatorInput>;
    readonly dir: InputMaybe<StringQueryOperatorInput>;
    readonly ext: InputMaybe<StringQueryOperatorInput>;
    readonly extension: InputMaybe<StringQueryOperatorInput>;
    readonly gid: InputMaybe<IntQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly ino: InputMaybe<FloatQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly mode: InputMaybe<IntQueryOperatorInput>;
    readonly modifiedTime: InputMaybe<DateQueryOperatorInput>;
    readonly mtime: InputMaybe<DateQueryOperatorInput>;
    readonly mtimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly name: InputMaybe<StringQueryOperatorInput>;
    readonly nlink: InputMaybe<IntQueryOperatorInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly prettySize: InputMaybe<StringQueryOperatorInput>;
    readonly rdev: InputMaybe<IntQueryOperatorInput>;
    readonly relativeDirectory: InputMaybe<StringQueryOperatorInput>;
    readonly relativePath: InputMaybe<StringQueryOperatorInput>;
    readonly root: InputMaybe<StringQueryOperatorInput>;
    readonly size: InputMaybe<IntQueryOperatorInput>;
    readonly sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
    readonly uid: InputMaybe<IntQueryOperatorInput>;
};

export type DirectoryGroupConnection = {
    readonly __typename?: "DirectoryGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<DirectoryEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<DirectoryGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<Directory>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type DirectoryGroupConnectionDistinctArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryGroupConnectionGroupArgs = {
    field: DirectoryFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type DirectoryGroupConnectionMaxArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryGroupConnectionMinArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectoryGroupConnectionSumArgs = {
    field: DirectoryFieldsEnum;
};

export type DirectorySortInput = {
    readonly fields: InputMaybe<ReadonlyArray<InputMaybe<DirectoryFieldsEnum>>>;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type DuotoneGradient = {
    readonly highlight: Scalars["String"];
    readonly opacity: InputMaybe<Scalars["Int"]>;
    readonly shadow: Scalars["String"];
};

export type File = Node & {
    readonly __typename?: "File";
    readonly absolutePath: Scalars["String"];
    readonly accessTime: Scalars["Date"];
    readonly atime: Scalars["Date"];
    readonly atimeMs: Scalars["Float"];
    readonly base: Scalars["String"];
    readonly birthTime: Scalars["Date"];
    /** @deprecated Use `birthTime` instead */
    readonly birthtime: Maybe<Scalars["Date"]>;
    /** @deprecated Use `birthTime` instead */
    readonly birthtimeMs: Maybe<Scalars["Float"]>;
    readonly blksize: Maybe<Scalars["Int"]>;
    readonly blocks: Maybe<Scalars["Int"]>;
    readonly changeTime: Scalars["Date"];
    /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
    readonly childImageSharp: Maybe<ImageSharp>;
    /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
    readonly childMarkdownRemark: Maybe<MarkdownRemark>;
    readonly children: ReadonlyArray<Node>;
    /** Returns all children nodes filtered by type ImageSharp */
    readonly childrenImageSharp: Maybe<ReadonlyArray<Maybe<ImageSharp>>>;
    /** Returns all children nodes filtered by type MarkdownRemark */
    readonly childrenMarkdownRemark: Maybe<
        ReadonlyArray<Maybe<MarkdownRemark>>
    >;
    readonly ctime: Scalars["Date"];
    readonly ctimeMs: Scalars["Float"];
    readonly dev: Scalars["Int"];
    readonly dir: Scalars["String"];
    readonly ext: Scalars["String"];
    readonly extension: Scalars["String"];
    readonly gid: Scalars["Int"];
    readonly id: Scalars["ID"];
    readonly ino: Scalars["Float"];
    readonly internal: Internal;
    readonly mode: Scalars["Int"];
    readonly modifiedTime: Scalars["Date"];
    readonly mtime: Scalars["Date"];
    readonly mtimeMs: Scalars["Float"];
    readonly name: Scalars["String"];
    readonly nlink: Scalars["Int"];
    readonly parent: Maybe<Node>;
    readonly prettySize: Scalars["String"];
    /** Copy file to static directory and return public url to it */
    readonly publicURL: Maybe<Scalars["String"]>;
    readonly rdev: Scalars["Int"];
    readonly relativeDirectory: Scalars["String"];
    readonly relativePath: Scalars["String"];
    readonly root: Scalars["String"];
    readonly size: Scalars["Int"];
    readonly sourceInstanceName: Scalars["String"];
    readonly uid: Scalars["Int"];
    readonly url: Maybe<Scalars["String"]>;
};

export type FileAccessTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileAtimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileBirthTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileChangeTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileCtimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileModifiedTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileMtimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type FileConnection = {
    readonly __typename?: "FileConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<FileEdge>;
    readonly group: ReadonlyArray<FileGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<File>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type FileConnectionDistinctArgs = {
    field: FileFieldsEnum;
};

export type FileConnectionGroupArgs = {
    field: FileFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type FileConnectionMaxArgs = {
    field: FileFieldsEnum;
};

export type FileConnectionMinArgs = {
    field: FileFieldsEnum;
};

export type FileConnectionSumArgs = {
    field: FileFieldsEnum;
};

export type FileEdge = {
    readonly __typename?: "FileEdge";
    readonly next: Maybe<File>;
    readonly node: File;
    readonly previous: Maybe<File>;
};

export enum FileFieldsEnum {
    AbsolutePath = "absolutePath",
    AccessTime = "accessTime",
    Atime = "atime",
    AtimeMs = "atimeMs",
    Base = "base",
    BirthTime = "birthTime",
    Birthtime = "birthtime",
    BirthtimeMs = "birthtimeMs",
    Blksize = "blksize",
    Blocks = "blocks",
    ChangeTime = "changeTime",
    ChildImageSharpChildren = "childImageSharp___children",
    ChildImageSharpChildrenChildren = "childImageSharp___children___children",
    ChildImageSharpChildrenChildrenChildren = "childImageSharp___children___children___children",
    ChildImageSharpChildrenChildrenId = "childImageSharp___children___children___id",
    ChildImageSharpChildrenId = "childImageSharp___children___id",
    ChildImageSharpChildrenInternalContent = "childImageSharp___children___internal___content",
    ChildImageSharpChildrenInternalContentDigest = "childImageSharp___children___internal___contentDigest",
    ChildImageSharpChildrenInternalDescription = "childImageSharp___children___internal___description",
    ChildImageSharpChildrenInternalFieldOwners = "childImageSharp___children___internal___fieldOwners",
    ChildImageSharpChildrenInternalIgnoreType = "childImageSharp___children___internal___ignoreType",
    ChildImageSharpChildrenInternalMediaType = "childImageSharp___children___internal___mediaType",
    ChildImageSharpChildrenInternalOwner = "childImageSharp___children___internal___owner",
    ChildImageSharpChildrenInternalType = "childImageSharp___children___internal___type",
    ChildImageSharpChildrenParentChildren = "childImageSharp___children___parent___children",
    ChildImageSharpChildrenParentId = "childImageSharp___children___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedAspectRatio = "childImageSharp___fixed___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedBase64 = "childImageSharp___fixed___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedHeight = "childImageSharp___fixed___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedOriginalName = "childImageSharp___fixed___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedSrc = "childImageSharp___fixed___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedSrcSet = "childImageSharp___fixed___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedSrcSetWebp = "childImageSharp___fixed___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedSrcWebp = "childImageSharp___fixed___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedTracedSvg = "childImageSharp___fixed___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFixedWidth = "childImageSharp___fixed___width",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidAspectRatio = "childImageSharp___fluid___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidBase64 = "childImageSharp___fluid___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidOriginalImg = "childImageSharp___fluid___originalImg",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidOriginalName = "childImageSharp___fluid___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidPresentationHeight = "childImageSharp___fluid___presentationHeight",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidPresentationWidth = "childImageSharp___fluid___presentationWidth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidSizes = "childImageSharp___fluid___sizes",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidSrc = "childImageSharp___fluid___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidSrcSet = "childImageSharp___fluid___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidSrcSetWebp = "childImageSharp___fluid___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidSrcWebp = "childImageSharp___fluid___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpFluidTracedSvg = "childImageSharp___fluid___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpGatsbyImageData = "childImageSharp___gatsbyImageData",
    ChildImageSharpId = "childImageSharp___id",
    ChildImageSharpInternalContent = "childImageSharp___internal___content",
    ChildImageSharpInternalContentDigest = "childImageSharp___internal___contentDigest",
    ChildImageSharpInternalDescription = "childImageSharp___internal___description",
    ChildImageSharpInternalFieldOwners = "childImageSharp___internal___fieldOwners",
    ChildImageSharpInternalIgnoreType = "childImageSharp___internal___ignoreType",
    ChildImageSharpInternalMediaType = "childImageSharp___internal___mediaType",
    ChildImageSharpInternalOwner = "childImageSharp___internal___owner",
    ChildImageSharpInternalType = "childImageSharp___internal___type",
    ChildImageSharpOriginalHeight = "childImageSharp___original___height",
    ChildImageSharpOriginalSrc = "childImageSharp___original___src",
    ChildImageSharpOriginalWidth = "childImageSharp___original___width",
    ChildImageSharpParentChildren = "childImageSharp___parent___children",
    ChildImageSharpParentChildrenChildren = "childImageSharp___parent___children___children",
    ChildImageSharpParentChildrenId = "childImageSharp___parent___children___id",
    ChildImageSharpParentId = "childImageSharp___parent___id",
    ChildImageSharpParentInternalContent = "childImageSharp___parent___internal___content",
    ChildImageSharpParentInternalContentDigest = "childImageSharp___parent___internal___contentDigest",
    ChildImageSharpParentInternalDescription = "childImageSharp___parent___internal___description",
    ChildImageSharpParentInternalFieldOwners = "childImageSharp___parent___internal___fieldOwners",
    ChildImageSharpParentInternalIgnoreType = "childImageSharp___parent___internal___ignoreType",
    ChildImageSharpParentInternalMediaType = "childImageSharp___parent___internal___mediaType",
    ChildImageSharpParentInternalOwner = "childImageSharp___parent___internal___owner",
    ChildImageSharpParentInternalType = "childImageSharp___parent___internal___type",
    ChildImageSharpParentParentChildren = "childImageSharp___parent___parent___children",
    ChildImageSharpParentParentId = "childImageSharp___parent___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpResizeAspectRatio = "childImageSharp___resize___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpResizeHeight = "childImageSharp___resize___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpResizeOriginalName = "childImageSharp___resize___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpResizeSrc = "childImageSharp___resize___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpResizeTracedSvg = "childImageSharp___resize___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildImageSharpResizeWidth = "childImageSharp___resize___width",
    ChildMarkdownRemarkChildren = "childMarkdownRemark___children",
    ChildMarkdownRemarkChildrenChildren = "childMarkdownRemark___children___children",
    ChildMarkdownRemarkChildrenChildrenChildren = "childMarkdownRemark___children___children___children",
    ChildMarkdownRemarkChildrenChildrenId = "childMarkdownRemark___children___children___id",
    ChildMarkdownRemarkChildrenId = "childMarkdownRemark___children___id",
    ChildMarkdownRemarkChildrenInternalContent = "childMarkdownRemark___children___internal___content",
    ChildMarkdownRemarkChildrenInternalContentDigest = "childMarkdownRemark___children___internal___contentDigest",
    ChildMarkdownRemarkChildrenInternalDescription = "childMarkdownRemark___children___internal___description",
    ChildMarkdownRemarkChildrenInternalFieldOwners = "childMarkdownRemark___children___internal___fieldOwners",
    ChildMarkdownRemarkChildrenInternalIgnoreType = "childMarkdownRemark___children___internal___ignoreType",
    ChildMarkdownRemarkChildrenInternalMediaType = "childMarkdownRemark___children___internal___mediaType",
    ChildMarkdownRemarkChildrenInternalOwner = "childMarkdownRemark___children___internal___owner",
    ChildMarkdownRemarkChildrenInternalType = "childMarkdownRemark___children___internal___type",
    ChildMarkdownRemarkChildrenParentChildren = "childMarkdownRemark___children___parent___children",
    ChildMarkdownRemarkChildrenParentId = "childMarkdownRemark___children___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkExcerpt = "childMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkExcerptAst = "childMarkdownRemark___excerptAst",
    ChildMarkdownRemarkFieldsHero = "childMarkdownRemark___fields___hero",
    ChildMarkdownRemarkFieldsSlug = "childMarkdownRemark___fields___slug",
    ChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___fileAbsolutePath",
    ChildMarkdownRemarkFrontmatterAuthor = "childMarkdownRemark___frontmatter___author",
    ChildMarkdownRemarkFrontmatterCategories = "childMarkdownRemark___frontmatter___categories",
    ChildMarkdownRemarkFrontmatterDate = "childMarkdownRemark___frontmatter___date",
    ChildMarkdownRemarkFrontmatterExcerpt = "childMarkdownRemark___frontmatter___excerpt",
    ChildMarkdownRemarkFrontmatterHero = "childMarkdownRemark___frontmatter___hero",
    ChildMarkdownRemarkFrontmatterLang = "childMarkdownRemark___frontmatter___lang",
    ChildMarkdownRemarkFrontmatterTitle = "childMarkdownRemark___frontmatter___title",
    ChildMarkdownRemarkFrontmatterType = "childMarkdownRemark___frontmatter___type",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeadings = "childMarkdownRemark___headings",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeadingsDepth = "childMarkdownRemark___headings___depth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeadingsId = "childMarkdownRemark___headings___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeadingsValue = "childMarkdownRemark___headings___value",
    ChildMarkdownRemarkHeroAbsolutePath = "childMarkdownRemark___hero___absolutePath",
    ChildMarkdownRemarkHeroAccessTime = "childMarkdownRemark___hero___accessTime",
    ChildMarkdownRemarkHeroAtime = "childMarkdownRemark___hero___atime",
    ChildMarkdownRemarkHeroAtimeMs = "childMarkdownRemark___hero___atimeMs",
    ChildMarkdownRemarkHeroBase = "childMarkdownRemark___hero___base",
    ChildMarkdownRemarkHeroBirthTime = "childMarkdownRemark___hero___birthTime",
    ChildMarkdownRemarkHeroBirthtime = "childMarkdownRemark___hero___birthtime",
    ChildMarkdownRemarkHeroBirthtimeMs = "childMarkdownRemark___hero___birthtimeMs",
    ChildMarkdownRemarkHeroBlksize = "childMarkdownRemark___hero___blksize",
    ChildMarkdownRemarkHeroBlocks = "childMarkdownRemark___hero___blocks",
    ChildMarkdownRemarkHeroChangeTime = "childMarkdownRemark___hero___changeTime",
    ChildMarkdownRemarkHeroChildImageSharpChildren = "childMarkdownRemark___hero___childImageSharp___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildImageSharpGatsbyImageData = "childMarkdownRemark___hero___childImageSharp___gatsbyImageData",
    ChildMarkdownRemarkHeroChildImageSharpId = "childMarkdownRemark___hero___childImageSharp___id",
    ChildMarkdownRemarkHeroChildMarkdownRemarkChildren = "childMarkdownRemark___hero___childMarkdownRemark___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildMarkdownRemarkExcerpt = "childMarkdownRemark___hero___childMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildMarkdownRemarkExcerptAst = "childMarkdownRemark___hero___childMarkdownRemark___excerptAst",
    ChildMarkdownRemarkHeroChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___hero___childMarkdownRemark___fileAbsolutePath",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildMarkdownRemarkHeadings = "childMarkdownRemark___hero___childMarkdownRemark___headings",
    ChildMarkdownRemarkHeroChildMarkdownRemarkHtml = "childMarkdownRemark___hero___childMarkdownRemark___html",
    ChildMarkdownRemarkHeroChildMarkdownRemarkHtmlAst = "childMarkdownRemark___hero___childMarkdownRemark___htmlAst",
    ChildMarkdownRemarkHeroChildMarkdownRemarkId = "childMarkdownRemark___hero___childMarkdownRemark___id",
    ChildMarkdownRemarkHeroChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___hero___childMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildMarkdownRemarkTableOfContents = "childMarkdownRemark___hero___childMarkdownRemark___tableOfContents",
    ChildMarkdownRemarkHeroChildMarkdownRemarkTimeToRead = "childMarkdownRemark___hero___childMarkdownRemark___timeToRead",
    ChildMarkdownRemarkHeroChildren = "childMarkdownRemark___hero___children",
    ChildMarkdownRemarkHeroChildrenImageSharp = "childMarkdownRemark___hero___childrenImageSharp",
    ChildMarkdownRemarkHeroChildrenImageSharpChildren = "childMarkdownRemark___hero___childrenImageSharp___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildrenImageSharpGatsbyImageData = "childMarkdownRemark___hero___childrenImageSharp___gatsbyImageData",
    ChildMarkdownRemarkHeroChildrenImageSharpId = "childMarkdownRemark___hero___childrenImageSharp___id",
    ChildMarkdownRemarkHeroChildrenMarkdownRemark = "childMarkdownRemark___hero___childrenMarkdownRemark",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkChildren = "childMarkdownRemark___hero___childrenMarkdownRemark___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkExcerpt = "childMarkdownRemark___hero___childrenMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkExcerptAst = "childMarkdownRemark___hero___childrenMarkdownRemark___excerptAst",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___hero___childrenMarkdownRemark___fileAbsolutePath",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkHeadings = "childMarkdownRemark___hero___childrenMarkdownRemark___headings",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkHtml = "childMarkdownRemark___hero___childrenMarkdownRemark___html",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkHtmlAst = "childMarkdownRemark___hero___childrenMarkdownRemark___htmlAst",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkId = "childMarkdownRemark___hero___childrenMarkdownRemark___id",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___hero___childrenMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkTableOfContents = "childMarkdownRemark___hero___childrenMarkdownRemark___tableOfContents",
    ChildMarkdownRemarkHeroChildrenMarkdownRemarkTimeToRead = "childMarkdownRemark___hero___childrenMarkdownRemark___timeToRead",
    ChildMarkdownRemarkHeroChildrenChildren = "childMarkdownRemark___hero___children___children",
    ChildMarkdownRemarkHeroChildrenId = "childMarkdownRemark___hero___children___id",
    ChildMarkdownRemarkHeroCtime = "childMarkdownRemark___hero___ctime",
    ChildMarkdownRemarkHeroCtimeMs = "childMarkdownRemark___hero___ctimeMs",
    ChildMarkdownRemarkHeroDev = "childMarkdownRemark___hero___dev",
    ChildMarkdownRemarkHeroDir = "childMarkdownRemark___hero___dir",
    ChildMarkdownRemarkHeroExt = "childMarkdownRemark___hero___ext",
    ChildMarkdownRemarkHeroExtension = "childMarkdownRemark___hero___extension",
    ChildMarkdownRemarkHeroGid = "childMarkdownRemark___hero___gid",
    ChildMarkdownRemarkHeroId = "childMarkdownRemark___hero___id",
    ChildMarkdownRemarkHeroIno = "childMarkdownRemark___hero___ino",
    ChildMarkdownRemarkHeroInternalContent = "childMarkdownRemark___hero___internal___content",
    ChildMarkdownRemarkHeroInternalContentDigest = "childMarkdownRemark___hero___internal___contentDigest",
    ChildMarkdownRemarkHeroInternalDescription = "childMarkdownRemark___hero___internal___description",
    ChildMarkdownRemarkHeroInternalFieldOwners = "childMarkdownRemark___hero___internal___fieldOwners",
    ChildMarkdownRemarkHeroInternalIgnoreType = "childMarkdownRemark___hero___internal___ignoreType",
    ChildMarkdownRemarkHeroInternalMediaType = "childMarkdownRemark___hero___internal___mediaType",
    ChildMarkdownRemarkHeroInternalOwner = "childMarkdownRemark___hero___internal___owner",
    ChildMarkdownRemarkHeroInternalType = "childMarkdownRemark___hero___internal___type",
    ChildMarkdownRemarkHeroMode = "childMarkdownRemark___hero___mode",
    ChildMarkdownRemarkHeroModifiedTime = "childMarkdownRemark___hero___modifiedTime",
    ChildMarkdownRemarkHeroMtime = "childMarkdownRemark___hero___mtime",
    ChildMarkdownRemarkHeroMtimeMs = "childMarkdownRemark___hero___mtimeMs",
    ChildMarkdownRemarkHeroName = "childMarkdownRemark___hero___name",
    ChildMarkdownRemarkHeroNlink = "childMarkdownRemark___hero___nlink",
    ChildMarkdownRemarkHeroParentChildren = "childMarkdownRemark___hero___parent___children",
    ChildMarkdownRemarkHeroParentId = "childMarkdownRemark___hero___parent___id",
    ChildMarkdownRemarkHeroPrettySize = "childMarkdownRemark___hero___prettySize",
    ChildMarkdownRemarkHeroPublicUrl = "childMarkdownRemark___hero___publicURL",
    ChildMarkdownRemarkHeroRdev = "childMarkdownRemark___hero___rdev",
    ChildMarkdownRemarkHeroRelativeDirectory = "childMarkdownRemark___hero___relativeDirectory",
    ChildMarkdownRemarkHeroRelativePath = "childMarkdownRemark___hero___relativePath",
    ChildMarkdownRemarkHeroRoot = "childMarkdownRemark___hero___root",
    ChildMarkdownRemarkHeroSize = "childMarkdownRemark___hero___size",
    ChildMarkdownRemarkHeroSourceInstanceName = "childMarkdownRemark___hero___sourceInstanceName",
    ChildMarkdownRemarkHeroUid = "childMarkdownRemark___hero___uid",
    ChildMarkdownRemarkHeroUrl = "childMarkdownRemark___hero___url",
    ChildMarkdownRemarkHtml = "childMarkdownRemark___html",
    ChildMarkdownRemarkHtmlAst = "childMarkdownRemark___htmlAst",
    ChildMarkdownRemarkId = "childMarkdownRemark___id",
    ChildMarkdownRemarkInternalContent = "childMarkdownRemark___internal___content",
    ChildMarkdownRemarkInternalContentDigest = "childMarkdownRemark___internal___contentDigest",
    ChildMarkdownRemarkInternalDescription = "childMarkdownRemark___internal___description",
    ChildMarkdownRemarkInternalFieldOwners = "childMarkdownRemark___internal___fieldOwners",
    ChildMarkdownRemarkInternalIgnoreType = "childMarkdownRemark___internal___ignoreType",
    ChildMarkdownRemarkInternalMediaType = "childMarkdownRemark___internal___mediaType",
    ChildMarkdownRemarkInternalOwner = "childMarkdownRemark___internal___owner",
    ChildMarkdownRemarkInternalType = "childMarkdownRemark___internal___type",
    ChildMarkdownRemarkParentChildren = "childMarkdownRemark___parent___children",
    ChildMarkdownRemarkParentChildrenChildren = "childMarkdownRemark___parent___children___children",
    ChildMarkdownRemarkParentChildrenId = "childMarkdownRemark___parent___children___id",
    ChildMarkdownRemarkParentId = "childMarkdownRemark___parent___id",
    ChildMarkdownRemarkParentInternalContent = "childMarkdownRemark___parent___internal___content",
    ChildMarkdownRemarkParentInternalContentDigest = "childMarkdownRemark___parent___internal___contentDigest",
    ChildMarkdownRemarkParentInternalDescription = "childMarkdownRemark___parent___internal___description",
    ChildMarkdownRemarkParentInternalFieldOwners = "childMarkdownRemark___parent___internal___fieldOwners",
    ChildMarkdownRemarkParentInternalIgnoreType = "childMarkdownRemark___parent___internal___ignoreType",
    ChildMarkdownRemarkParentInternalMediaType = "childMarkdownRemark___parent___internal___mediaType",
    ChildMarkdownRemarkParentInternalOwner = "childMarkdownRemark___parent___internal___owner",
    ChildMarkdownRemarkParentInternalType = "childMarkdownRemark___parent___internal___type",
    ChildMarkdownRemarkParentParentChildren = "childMarkdownRemark___parent___parent___children",
    ChildMarkdownRemarkParentParentId = "childMarkdownRemark___parent___parent___id",
    ChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildMarkdownRemarkTableOfContents = "childMarkdownRemark___tableOfContents",
    ChildMarkdownRemarkTimeToRead = "childMarkdownRemark___timeToRead",
    ChildMarkdownRemarkWordCountParagraphs = "childMarkdownRemark___wordCount___paragraphs",
    ChildMarkdownRemarkWordCountSentences = "childMarkdownRemark___wordCount___sentences",
    ChildMarkdownRemarkWordCountWords = "childMarkdownRemark___wordCount___words",
    Children = "children",
    ChildrenImageSharp = "childrenImageSharp",
    ChildrenImageSharpChildren = "childrenImageSharp___children",
    ChildrenImageSharpChildrenChildren = "childrenImageSharp___children___children",
    ChildrenImageSharpChildrenChildrenChildren = "childrenImageSharp___children___children___children",
    ChildrenImageSharpChildrenChildrenId = "childrenImageSharp___children___children___id",
    ChildrenImageSharpChildrenId = "childrenImageSharp___children___id",
    ChildrenImageSharpChildrenInternalContent = "childrenImageSharp___children___internal___content",
    ChildrenImageSharpChildrenInternalContentDigest = "childrenImageSharp___children___internal___contentDigest",
    ChildrenImageSharpChildrenInternalDescription = "childrenImageSharp___children___internal___description",
    ChildrenImageSharpChildrenInternalFieldOwners = "childrenImageSharp___children___internal___fieldOwners",
    ChildrenImageSharpChildrenInternalIgnoreType = "childrenImageSharp___children___internal___ignoreType",
    ChildrenImageSharpChildrenInternalMediaType = "childrenImageSharp___children___internal___mediaType",
    ChildrenImageSharpChildrenInternalOwner = "childrenImageSharp___children___internal___owner",
    ChildrenImageSharpChildrenInternalType = "childrenImageSharp___children___internal___type",
    ChildrenImageSharpChildrenParentChildren = "childrenImageSharp___children___parent___children",
    ChildrenImageSharpChildrenParentId = "childrenImageSharp___children___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedAspectRatio = "childrenImageSharp___fixed___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedBase64 = "childrenImageSharp___fixed___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedHeight = "childrenImageSharp___fixed___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedOriginalName = "childrenImageSharp___fixed___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedSrc = "childrenImageSharp___fixed___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedSrcSet = "childrenImageSharp___fixed___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedSrcSetWebp = "childrenImageSharp___fixed___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedSrcWebp = "childrenImageSharp___fixed___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedTracedSvg = "childrenImageSharp___fixed___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFixedWidth = "childrenImageSharp___fixed___width",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidAspectRatio = "childrenImageSharp___fluid___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidBase64 = "childrenImageSharp___fluid___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidOriginalImg = "childrenImageSharp___fluid___originalImg",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidOriginalName = "childrenImageSharp___fluid___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidPresentationHeight = "childrenImageSharp___fluid___presentationHeight",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidPresentationWidth = "childrenImageSharp___fluid___presentationWidth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidSizes = "childrenImageSharp___fluid___sizes",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidSrc = "childrenImageSharp___fluid___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidSrcSet = "childrenImageSharp___fluid___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidSrcSetWebp = "childrenImageSharp___fluid___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidSrcWebp = "childrenImageSharp___fluid___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpFluidTracedSvg = "childrenImageSharp___fluid___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpGatsbyImageData = "childrenImageSharp___gatsbyImageData",
    ChildrenImageSharpId = "childrenImageSharp___id",
    ChildrenImageSharpInternalContent = "childrenImageSharp___internal___content",
    ChildrenImageSharpInternalContentDigest = "childrenImageSharp___internal___contentDigest",
    ChildrenImageSharpInternalDescription = "childrenImageSharp___internal___description",
    ChildrenImageSharpInternalFieldOwners = "childrenImageSharp___internal___fieldOwners",
    ChildrenImageSharpInternalIgnoreType = "childrenImageSharp___internal___ignoreType",
    ChildrenImageSharpInternalMediaType = "childrenImageSharp___internal___mediaType",
    ChildrenImageSharpInternalOwner = "childrenImageSharp___internal___owner",
    ChildrenImageSharpInternalType = "childrenImageSharp___internal___type",
    ChildrenImageSharpOriginalHeight = "childrenImageSharp___original___height",
    ChildrenImageSharpOriginalSrc = "childrenImageSharp___original___src",
    ChildrenImageSharpOriginalWidth = "childrenImageSharp___original___width",
    ChildrenImageSharpParentChildren = "childrenImageSharp___parent___children",
    ChildrenImageSharpParentChildrenChildren = "childrenImageSharp___parent___children___children",
    ChildrenImageSharpParentChildrenId = "childrenImageSharp___parent___children___id",
    ChildrenImageSharpParentId = "childrenImageSharp___parent___id",
    ChildrenImageSharpParentInternalContent = "childrenImageSharp___parent___internal___content",
    ChildrenImageSharpParentInternalContentDigest = "childrenImageSharp___parent___internal___contentDigest",
    ChildrenImageSharpParentInternalDescription = "childrenImageSharp___parent___internal___description",
    ChildrenImageSharpParentInternalFieldOwners = "childrenImageSharp___parent___internal___fieldOwners",
    ChildrenImageSharpParentInternalIgnoreType = "childrenImageSharp___parent___internal___ignoreType",
    ChildrenImageSharpParentInternalMediaType = "childrenImageSharp___parent___internal___mediaType",
    ChildrenImageSharpParentInternalOwner = "childrenImageSharp___parent___internal___owner",
    ChildrenImageSharpParentInternalType = "childrenImageSharp___parent___internal___type",
    ChildrenImageSharpParentParentChildren = "childrenImageSharp___parent___parent___children",
    ChildrenImageSharpParentParentId = "childrenImageSharp___parent___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpResizeAspectRatio = "childrenImageSharp___resize___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpResizeHeight = "childrenImageSharp___resize___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpResizeOriginalName = "childrenImageSharp___resize___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpResizeSrc = "childrenImageSharp___resize___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpResizeTracedSvg = "childrenImageSharp___resize___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenImageSharpResizeWidth = "childrenImageSharp___resize___width",
    ChildrenMarkdownRemark = "childrenMarkdownRemark",
    ChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___children",
    ChildrenMarkdownRemarkChildrenChildren = "childrenMarkdownRemark___children___children",
    ChildrenMarkdownRemarkChildrenChildrenChildren = "childrenMarkdownRemark___children___children___children",
    ChildrenMarkdownRemarkChildrenChildrenId = "childrenMarkdownRemark___children___children___id",
    ChildrenMarkdownRemarkChildrenId = "childrenMarkdownRemark___children___id",
    ChildrenMarkdownRemarkChildrenInternalContent = "childrenMarkdownRemark___children___internal___content",
    ChildrenMarkdownRemarkChildrenInternalContentDigest = "childrenMarkdownRemark___children___internal___contentDigest",
    ChildrenMarkdownRemarkChildrenInternalDescription = "childrenMarkdownRemark___children___internal___description",
    ChildrenMarkdownRemarkChildrenInternalFieldOwners = "childrenMarkdownRemark___children___internal___fieldOwners",
    ChildrenMarkdownRemarkChildrenInternalIgnoreType = "childrenMarkdownRemark___children___internal___ignoreType",
    ChildrenMarkdownRemarkChildrenInternalMediaType = "childrenMarkdownRemark___children___internal___mediaType",
    ChildrenMarkdownRemarkChildrenInternalOwner = "childrenMarkdownRemark___children___internal___owner",
    ChildrenMarkdownRemarkChildrenInternalType = "childrenMarkdownRemark___children___internal___type",
    ChildrenMarkdownRemarkChildrenParentChildren = "childrenMarkdownRemark___children___parent___children",
    ChildrenMarkdownRemarkChildrenParentId = "childrenMarkdownRemark___children___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___excerptAst",
    ChildrenMarkdownRemarkFieldsHero = "childrenMarkdownRemark___fields___hero",
    ChildrenMarkdownRemarkFieldsSlug = "childrenMarkdownRemark___fields___slug",
    ChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___fileAbsolutePath",
    ChildrenMarkdownRemarkFrontmatterAuthor = "childrenMarkdownRemark___frontmatter___author",
    ChildrenMarkdownRemarkFrontmatterCategories = "childrenMarkdownRemark___frontmatter___categories",
    ChildrenMarkdownRemarkFrontmatterDate = "childrenMarkdownRemark___frontmatter___date",
    ChildrenMarkdownRemarkFrontmatterExcerpt = "childrenMarkdownRemark___frontmatter___excerpt",
    ChildrenMarkdownRemarkFrontmatterHero = "childrenMarkdownRemark___frontmatter___hero",
    ChildrenMarkdownRemarkFrontmatterLang = "childrenMarkdownRemark___frontmatter___lang",
    ChildrenMarkdownRemarkFrontmatterTitle = "childrenMarkdownRemark___frontmatter___title",
    ChildrenMarkdownRemarkFrontmatterType = "childrenMarkdownRemark___frontmatter___type",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___headings",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeadingsDepth = "childrenMarkdownRemark___headings___depth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeadingsId = "childrenMarkdownRemark___headings___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeadingsValue = "childrenMarkdownRemark___headings___value",
    ChildrenMarkdownRemarkHeroAbsolutePath = "childrenMarkdownRemark___hero___absolutePath",
    ChildrenMarkdownRemarkHeroAccessTime = "childrenMarkdownRemark___hero___accessTime",
    ChildrenMarkdownRemarkHeroAtime = "childrenMarkdownRemark___hero___atime",
    ChildrenMarkdownRemarkHeroAtimeMs = "childrenMarkdownRemark___hero___atimeMs",
    ChildrenMarkdownRemarkHeroBase = "childrenMarkdownRemark___hero___base",
    ChildrenMarkdownRemarkHeroBirthTime = "childrenMarkdownRemark___hero___birthTime",
    ChildrenMarkdownRemarkHeroBirthtime = "childrenMarkdownRemark___hero___birthtime",
    ChildrenMarkdownRemarkHeroBirthtimeMs = "childrenMarkdownRemark___hero___birthtimeMs",
    ChildrenMarkdownRemarkHeroBlksize = "childrenMarkdownRemark___hero___blksize",
    ChildrenMarkdownRemarkHeroBlocks = "childrenMarkdownRemark___hero___blocks",
    ChildrenMarkdownRemarkHeroChangeTime = "childrenMarkdownRemark___hero___changeTime",
    ChildrenMarkdownRemarkHeroChildImageSharpChildren = "childrenMarkdownRemark___hero___childImageSharp___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildImageSharpGatsbyImageData = "childrenMarkdownRemark___hero___childImageSharp___gatsbyImageData",
    ChildrenMarkdownRemarkHeroChildImageSharpId = "childrenMarkdownRemark___hero___childImageSharp___id",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkChildren = "childrenMarkdownRemark___hero___childMarkdownRemark___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkExcerpt = "childrenMarkdownRemark___hero___childMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkExcerptAst = "childrenMarkdownRemark___hero___childMarkdownRemark___excerptAst",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___hero___childMarkdownRemark___fileAbsolutePath",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkHeadings = "childrenMarkdownRemark___hero___childMarkdownRemark___headings",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkHtml = "childrenMarkdownRemark___hero___childMarkdownRemark___html",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkHtmlAst = "childrenMarkdownRemark___hero___childMarkdownRemark___htmlAst",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkId = "childrenMarkdownRemark___hero___childMarkdownRemark___id",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___hero___childMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkTableOfContents = "childrenMarkdownRemark___hero___childMarkdownRemark___tableOfContents",
    ChildrenMarkdownRemarkHeroChildMarkdownRemarkTimeToRead = "childrenMarkdownRemark___hero___childMarkdownRemark___timeToRead",
    ChildrenMarkdownRemarkHeroChildren = "childrenMarkdownRemark___hero___children",
    ChildrenMarkdownRemarkHeroChildrenImageSharp = "childrenMarkdownRemark___hero___childrenImageSharp",
    ChildrenMarkdownRemarkHeroChildrenImageSharpChildren = "childrenMarkdownRemark___hero___childrenImageSharp___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildrenImageSharpGatsbyImageData = "childrenMarkdownRemark___hero___childrenImageSharp___gatsbyImageData",
    ChildrenMarkdownRemarkHeroChildrenImageSharpId = "childrenMarkdownRemark___hero___childrenImageSharp___id",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemark = "childrenMarkdownRemark___hero___childrenMarkdownRemark",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___hero___childrenMarkdownRemark___children",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___hero___childrenMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___hero___childrenMarkdownRemark___excerptAst",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___hero___childrenMarkdownRemark___fileAbsolutePath",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___hero___childrenMarkdownRemark___headings",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___hero___childrenMarkdownRemark___html",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___hero___childrenMarkdownRemark___htmlAst",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkId = "childrenMarkdownRemark___hero___childrenMarkdownRemark___id",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___hero___childrenMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___hero___childrenMarkdownRemark___tableOfContents",
    ChildrenMarkdownRemarkHeroChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___hero___childrenMarkdownRemark___timeToRead",
    ChildrenMarkdownRemarkHeroChildrenChildren = "childrenMarkdownRemark___hero___children___children",
    ChildrenMarkdownRemarkHeroChildrenId = "childrenMarkdownRemark___hero___children___id",
    ChildrenMarkdownRemarkHeroCtime = "childrenMarkdownRemark___hero___ctime",
    ChildrenMarkdownRemarkHeroCtimeMs = "childrenMarkdownRemark___hero___ctimeMs",
    ChildrenMarkdownRemarkHeroDev = "childrenMarkdownRemark___hero___dev",
    ChildrenMarkdownRemarkHeroDir = "childrenMarkdownRemark___hero___dir",
    ChildrenMarkdownRemarkHeroExt = "childrenMarkdownRemark___hero___ext",
    ChildrenMarkdownRemarkHeroExtension = "childrenMarkdownRemark___hero___extension",
    ChildrenMarkdownRemarkHeroGid = "childrenMarkdownRemark___hero___gid",
    ChildrenMarkdownRemarkHeroId = "childrenMarkdownRemark___hero___id",
    ChildrenMarkdownRemarkHeroIno = "childrenMarkdownRemark___hero___ino",
    ChildrenMarkdownRemarkHeroInternalContent = "childrenMarkdownRemark___hero___internal___content",
    ChildrenMarkdownRemarkHeroInternalContentDigest = "childrenMarkdownRemark___hero___internal___contentDigest",
    ChildrenMarkdownRemarkHeroInternalDescription = "childrenMarkdownRemark___hero___internal___description",
    ChildrenMarkdownRemarkHeroInternalFieldOwners = "childrenMarkdownRemark___hero___internal___fieldOwners",
    ChildrenMarkdownRemarkHeroInternalIgnoreType = "childrenMarkdownRemark___hero___internal___ignoreType",
    ChildrenMarkdownRemarkHeroInternalMediaType = "childrenMarkdownRemark___hero___internal___mediaType",
    ChildrenMarkdownRemarkHeroInternalOwner = "childrenMarkdownRemark___hero___internal___owner",
    ChildrenMarkdownRemarkHeroInternalType = "childrenMarkdownRemark___hero___internal___type",
    ChildrenMarkdownRemarkHeroMode = "childrenMarkdownRemark___hero___mode",
    ChildrenMarkdownRemarkHeroModifiedTime = "childrenMarkdownRemark___hero___modifiedTime",
    ChildrenMarkdownRemarkHeroMtime = "childrenMarkdownRemark___hero___mtime",
    ChildrenMarkdownRemarkHeroMtimeMs = "childrenMarkdownRemark___hero___mtimeMs",
    ChildrenMarkdownRemarkHeroName = "childrenMarkdownRemark___hero___name",
    ChildrenMarkdownRemarkHeroNlink = "childrenMarkdownRemark___hero___nlink",
    ChildrenMarkdownRemarkHeroParentChildren = "childrenMarkdownRemark___hero___parent___children",
    ChildrenMarkdownRemarkHeroParentId = "childrenMarkdownRemark___hero___parent___id",
    ChildrenMarkdownRemarkHeroPrettySize = "childrenMarkdownRemark___hero___prettySize",
    ChildrenMarkdownRemarkHeroPublicUrl = "childrenMarkdownRemark___hero___publicURL",
    ChildrenMarkdownRemarkHeroRdev = "childrenMarkdownRemark___hero___rdev",
    ChildrenMarkdownRemarkHeroRelativeDirectory = "childrenMarkdownRemark___hero___relativeDirectory",
    ChildrenMarkdownRemarkHeroRelativePath = "childrenMarkdownRemark___hero___relativePath",
    ChildrenMarkdownRemarkHeroRoot = "childrenMarkdownRemark___hero___root",
    ChildrenMarkdownRemarkHeroSize = "childrenMarkdownRemark___hero___size",
    ChildrenMarkdownRemarkHeroSourceInstanceName = "childrenMarkdownRemark___hero___sourceInstanceName",
    ChildrenMarkdownRemarkHeroUid = "childrenMarkdownRemark___hero___uid",
    ChildrenMarkdownRemarkHeroUrl = "childrenMarkdownRemark___hero___url",
    ChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___html",
    ChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___htmlAst",
    ChildrenMarkdownRemarkId = "childrenMarkdownRemark___id",
    ChildrenMarkdownRemarkInternalContent = "childrenMarkdownRemark___internal___content",
    ChildrenMarkdownRemarkInternalContentDigest = "childrenMarkdownRemark___internal___contentDigest",
    ChildrenMarkdownRemarkInternalDescription = "childrenMarkdownRemark___internal___description",
    ChildrenMarkdownRemarkInternalFieldOwners = "childrenMarkdownRemark___internal___fieldOwners",
    ChildrenMarkdownRemarkInternalIgnoreType = "childrenMarkdownRemark___internal___ignoreType",
    ChildrenMarkdownRemarkInternalMediaType = "childrenMarkdownRemark___internal___mediaType",
    ChildrenMarkdownRemarkInternalOwner = "childrenMarkdownRemark___internal___owner",
    ChildrenMarkdownRemarkInternalType = "childrenMarkdownRemark___internal___type",
    ChildrenMarkdownRemarkParentChildren = "childrenMarkdownRemark___parent___children",
    ChildrenMarkdownRemarkParentChildrenChildren = "childrenMarkdownRemark___parent___children___children",
    ChildrenMarkdownRemarkParentChildrenId = "childrenMarkdownRemark___parent___children___id",
    ChildrenMarkdownRemarkParentId = "childrenMarkdownRemark___parent___id",
    ChildrenMarkdownRemarkParentInternalContent = "childrenMarkdownRemark___parent___internal___content",
    ChildrenMarkdownRemarkParentInternalContentDigest = "childrenMarkdownRemark___parent___internal___contentDigest",
    ChildrenMarkdownRemarkParentInternalDescription = "childrenMarkdownRemark___parent___internal___description",
    ChildrenMarkdownRemarkParentInternalFieldOwners = "childrenMarkdownRemark___parent___internal___fieldOwners",
    ChildrenMarkdownRemarkParentInternalIgnoreType = "childrenMarkdownRemark___parent___internal___ignoreType",
    ChildrenMarkdownRemarkParentInternalMediaType = "childrenMarkdownRemark___parent___internal___mediaType",
    ChildrenMarkdownRemarkParentInternalOwner = "childrenMarkdownRemark___parent___internal___owner",
    ChildrenMarkdownRemarkParentInternalType = "childrenMarkdownRemark___parent___internal___type",
    ChildrenMarkdownRemarkParentParentChildren = "childrenMarkdownRemark___parent___parent___children",
    ChildrenMarkdownRemarkParentParentId = "childrenMarkdownRemark___parent___parent___id",
    ChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___tableOfContents",
    ChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___timeToRead",
    ChildrenMarkdownRemarkWordCountParagraphs = "childrenMarkdownRemark___wordCount___paragraphs",
    ChildrenMarkdownRemarkWordCountSentences = "childrenMarkdownRemark___wordCount___sentences",
    ChildrenMarkdownRemarkWordCountWords = "childrenMarkdownRemark___wordCount___words",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    Ctime = "ctime",
    CtimeMs = "ctimeMs",
    Dev = "dev",
    Dir = "dir",
    Ext = "ext",
    Extension = "extension",
    Gid = "gid",
    Id = "id",
    Ino = "ino",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    Mode = "mode",
    ModifiedTime = "modifiedTime",
    Mtime = "mtime",
    MtimeMs = "mtimeMs",
    Name = "name",
    Nlink = "nlink",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    PrettySize = "prettySize",
    PublicUrl = "publicURL",
    Rdev = "rdev",
    RelativeDirectory = "relativeDirectory",
    RelativePath = "relativePath",
    Root = "root",
    Size = "size",
    SourceInstanceName = "sourceInstanceName",
    Uid = "uid",
    Url = "url",
}

export type FileFilterInput = {
    readonly absolutePath: InputMaybe<StringQueryOperatorInput>;
    readonly accessTime: InputMaybe<DateQueryOperatorInput>;
    readonly atime: InputMaybe<DateQueryOperatorInput>;
    readonly atimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly base: InputMaybe<StringQueryOperatorInput>;
    readonly birthTime: InputMaybe<DateQueryOperatorInput>;
    readonly birthtime: InputMaybe<DateQueryOperatorInput>;
    readonly birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly blksize: InputMaybe<IntQueryOperatorInput>;
    readonly blocks: InputMaybe<IntQueryOperatorInput>;
    readonly changeTime: InputMaybe<DateQueryOperatorInput>;
    readonly childImageSharp: InputMaybe<ImageSharpFilterInput>;
    readonly childMarkdownRemark: InputMaybe<MarkdownRemarkFilterInput>;
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly childrenImageSharp: InputMaybe<ImageSharpFilterListInput>;
    readonly childrenMarkdownRemark: InputMaybe<MarkdownRemarkFilterListInput>;
    readonly ctime: InputMaybe<DateQueryOperatorInput>;
    readonly ctimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly dev: InputMaybe<IntQueryOperatorInput>;
    readonly dir: InputMaybe<StringQueryOperatorInput>;
    readonly ext: InputMaybe<StringQueryOperatorInput>;
    readonly extension: InputMaybe<StringQueryOperatorInput>;
    readonly gid: InputMaybe<IntQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly ino: InputMaybe<FloatQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly mode: InputMaybe<IntQueryOperatorInput>;
    readonly modifiedTime: InputMaybe<DateQueryOperatorInput>;
    readonly mtime: InputMaybe<DateQueryOperatorInput>;
    readonly mtimeMs: InputMaybe<FloatQueryOperatorInput>;
    readonly name: InputMaybe<StringQueryOperatorInput>;
    readonly nlink: InputMaybe<IntQueryOperatorInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly prettySize: InputMaybe<StringQueryOperatorInput>;
    readonly publicURL: InputMaybe<StringQueryOperatorInput>;
    readonly rdev: InputMaybe<IntQueryOperatorInput>;
    readonly relativeDirectory: InputMaybe<StringQueryOperatorInput>;
    readonly relativePath: InputMaybe<StringQueryOperatorInput>;
    readonly root: InputMaybe<StringQueryOperatorInput>;
    readonly size: InputMaybe<IntQueryOperatorInput>;
    readonly sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
    readonly uid: InputMaybe<IntQueryOperatorInput>;
    readonly url: InputMaybe<StringQueryOperatorInput>;
};

export type FileGroupConnection = {
    readonly __typename?: "FileGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<FileEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<FileGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<File>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type FileGroupConnectionDistinctArgs = {
    field: FileFieldsEnum;
};

export type FileGroupConnectionGroupArgs = {
    field: FileFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type FileGroupConnectionMaxArgs = {
    field: FileFieldsEnum;
};

export type FileGroupConnectionMinArgs = {
    field: FileFieldsEnum;
};

export type FileGroupConnectionSumArgs = {
    field: FileFieldsEnum;
};

export type FileSortInput = {
    readonly fields: InputMaybe<ReadonlyArray<InputMaybe<FileFieldsEnum>>>;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type FloatQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["Float"]>;
    readonly gt: InputMaybe<Scalars["Float"]>;
    readonly gte: InputMaybe<Scalars["Float"]>;
    readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Float"]>>>;
    readonly lt: InputMaybe<Scalars["Float"]>;
    readonly lte: InputMaybe<Scalars["Float"]>;
    readonly ne: InputMaybe<Scalars["Float"]>;
    readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Float"]>>>;
};

export type GatsbyImageDataQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["GatsbyImageData"]>;
    readonly in: InputMaybe<
        ReadonlyArray<InputMaybe<Scalars["GatsbyImageData"]>>
    >;
    readonly ne: InputMaybe<Scalars["GatsbyImageData"]>;
    readonly nin: InputMaybe<
        ReadonlyArray<InputMaybe<Scalars["GatsbyImageData"]>>
    >;
};

export enum GatsbyImageFormat {
    Auto = "AUTO",
    Avif = "AVIF",
    Jpg = "JPG",
    NoChange = "NO_CHANGE",
    Png = "PNG",
    Webp = "WEBP",
}

export enum GatsbyImageLayout {
    Constrained = "CONSTRAINED",
    Fixed = "FIXED",
    FullWidth = "FULL_WIDTH",
}

export enum GatsbyImagePlaceholder {
    Blurred = "BLURRED",
    DominantColor = "DOMINANT_COLOR",
    None = "NONE",
    TracedSvg = "TRACED_SVG",
}

export enum ImageCropFocus {
    Attention = "ATTENTION",
    Center = "CENTER",
    East = "EAST",
    Entropy = "ENTROPY",
    North = "NORTH",
    Northeast = "NORTHEAST",
    Northwest = "NORTHWEST",
    South = "SOUTH",
    Southeast = "SOUTHEAST",
    Southwest = "SOUTHWEST",
    West = "WEST",
}

export enum ImageFit {
    Contain = "CONTAIN",
    Cover = "COVER",
    Fill = "FILL",
    Inside = "INSIDE",
    Outside = "OUTSIDE",
}

export enum ImageFormat {
    Auto = "AUTO",
    Avif = "AVIF",
    Jpg = "JPG",
    NoChange = "NO_CHANGE",
    Png = "PNG",
    Webp = "WEBP",
}

export enum ImageLayout {
    Constrained = "CONSTRAINED",
    Fixed = "FIXED",
    FullWidth = "FULL_WIDTH",
}

export enum ImagePlaceholder {
    Blurred = "BLURRED",
    DominantColor = "DOMINANT_COLOR",
    None = "NONE",
    TracedSvg = "TRACED_SVG",
}

export type ImageSharp = Node & {
    readonly __typename?: "ImageSharp";
    readonly children: ReadonlyArray<Node>;
    readonly fixed: Maybe<ImageSharpFixed>;
    readonly fluid: Maybe<ImageSharpFluid>;
    readonly gatsbyImageData: Scalars["GatsbyImageData"];
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly original: Maybe<ImageSharpOriginal>;
    readonly parent: Maybe<Node>;
    readonly resize: Maybe<ImageSharpResize>;
};

export type ImageSharpFixedArgs = {
    background?: InputMaybe<Scalars["String"]>;
    base64Width: InputMaybe<Scalars["Int"]>;
    cropFocus?: InputMaybe<ImageCropFocus>;
    duotone: InputMaybe<DuotoneGradient>;
    fit?: InputMaybe<ImageFit>;
    grayscale?: InputMaybe<Scalars["Boolean"]>;
    height: InputMaybe<Scalars["Int"]>;
    jpegProgressive?: InputMaybe<Scalars["Boolean"]>;
    jpegQuality: InputMaybe<Scalars["Int"]>;
    pngCompressionSpeed?: InputMaybe<Scalars["Int"]>;
    pngQuality: InputMaybe<Scalars["Int"]>;
    quality: InputMaybe<Scalars["Int"]>;
    rotate?: InputMaybe<Scalars["Int"]>;
    toFormat?: InputMaybe<ImageFormat>;
    toFormatBase64?: InputMaybe<ImageFormat>;
    traceSVG: InputMaybe<Potrace>;
    trim?: InputMaybe<Scalars["Float"]>;
    webpQuality: InputMaybe<Scalars["Int"]>;
    width: InputMaybe<Scalars["Int"]>;
};

export type ImageSharpFluidArgs = {
    background?: InputMaybe<Scalars["String"]>;
    base64Width: InputMaybe<Scalars["Int"]>;
    cropFocus?: InputMaybe<ImageCropFocus>;
    duotone: InputMaybe<DuotoneGradient>;
    fit?: InputMaybe<ImageFit>;
    grayscale?: InputMaybe<Scalars["Boolean"]>;
    jpegProgressive?: InputMaybe<Scalars["Boolean"]>;
    jpegQuality: InputMaybe<Scalars["Int"]>;
    maxHeight: InputMaybe<Scalars["Int"]>;
    maxWidth: InputMaybe<Scalars["Int"]>;
    pngCompressionSpeed?: InputMaybe<Scalars["Int"]>;
    pngQuality: InputMaybe<Scalars["Int"]>;
    quality: InputMaybe<Scalars["Int"]>;
    rotate?: InputMaybe<Scalars["Int"]>;
    sizes?: InputMaybe<Scalars["String"]>;
    srcSetBreakpoints?: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Int"]>>>;
    toFormat?: InputMaybe<ImageFormat>;
    toFormatBase64?: InputMaybe<ImageFormat>;
    traceSVG: InputMaybe<Potrace>;
    trim?: InputMaybe<Scalars["Float"]>;
    webpQuality: InputMaybe<Scalars["Int"]>;
};

export type ImageSharpGatsbyImageDataArgs = {
    aspectRatio: InputMaybe<Scalars["Float"]>;
    avifOptions: InputMaybe<AvifOptions>;
    backgroundColor: InputMaybe<Scalars["String"]>;
    blurredOptions: InputMaybe<BlurredOptions>;
    breakpoints: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Int"]>>>;
    formats: InputMaybe<ReadonlyArray<InputMaybe<ImageFormat>>>;
    height: InputMaybe<Scalars["Int"]>;
    jpgOptions: InputMaybe<JpgOptions>;
    layout?: InputMaybe<ImageLayout>;
    outputPixelDensities: InputMaybe<
        ReadonlyArray<InputMaybe<Scalars["Float"]>>
    >;
    placeholder: InputMaybe<ImagePlaceholder>;
    pngOptions: InputMaybe<PngOptions>;
    quality: InputMaybe<Scalars["Int"]>;
    sizes: InputMaybe<Scalars["String"]>;
    tracedSVGOptions: InputMaybe<Potrace>;
    transformOptions: InputMaybe<TransformOptions>;
    webpOptions: InputMaybe<WebPOptions>;
    width: InputMaybe<Scalars["Int"]>;
};

export type ImageSharpResizeArgs = {
    background?: InputMaybe<Scalars["String"]>;
    base64?: InputMaybe<Scalars["Boolean"]>;
    cropFocus?: InputMaybe<ImageCropFocus>;
    duotone: InputMaybe<DuotoneGradient>;
    fit?: InputMaybe<ImageFit>;
    grayscale?: InputMaybe<Scalars["Boolean"]>;
    height: InputMaybe<Scalars["Int"]>;
    jpegProgressive?: InputMaybe<Scalars["Boolean"]>;
    jpegQuality: InputMaybe<Scalars["Int"]>;
    pngCompressionLevel?: InputMaybe<Scalars["Int"]>;
    pngCompressionSpeed?: InputMaybe<Scalars["Int"]>;
    pngQuality: InputMaybe<Scalars["Int"]>;
    quality: InputMaybe<Scalars["Int"]>;
    rotate?: InputMaybe<Scalars["Int"]>;
    toFormat?: InputMaybe<ImageFormat>;
    traceSVG: InputMaybe<Potrace>;
    trim?: InputMaybe<Scalars["Float"]>;
    webpQuality: InputMaybe<Scalars["Int"]>;
    width: InputMaybe<Scalars["Int"]>;
};

export type ImageSharpConnection = {
    readonly __typename?: "ImageSharpConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<ImageSharpEdge>;
    readonly group: ReadonlyArray<ImageSharpGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<ImageSharp>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type ImageSharpConnectionDistinctArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionGroupArgs = {
    field: ImageSharpFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type ImageSharpConnectionMaxArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionMinArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpConnectionSumArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
    readonly __typename?: "ImageSharpEdge";
    readonly next: Maybe<ImageSharp>;
    readonly node: ImageSharp;
    readonly previous: Maybe<ImageSharp>;
};

export enum ImageSharpFieldsEnum {
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedAspectRatio = "fixed___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedBase64 = "fixed___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedHeight = "fixed___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedOriginalName = "fixed___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedSrc = "fixed___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedSrcSet = "fixed___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedSrcSetWebp = "fixed___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedSrcWebp = "fixed___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedTracedSvg = "fixed___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FixedWidth = "fixed___width",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidAspectRatio = "fluid___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidBase64 = "fluid___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidOriginalImg = "fluid___originalImg",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidOriginalName = "fluid___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidPresentationHeight = "fluid___presentationHeight",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidPresentationWidth = "fluid___presentationWidth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidSizes = "fluid___sizes",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidSrc = "fluid___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidSrcSet = "fluid___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidSrcSetWebp = "fluid___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidSrcWebp = "fluid___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    FluidTracedSvg = "fluid___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    GatsbyImageData = "gatsbyImageData",
    Id = "id",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    OriginalHeight = "original___height",
    OriginalSrc = "original___src",
    OriginalWidth = "original___width",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ResizeAspectRatio = "resize___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ResizeHeight = "resize___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ResizeOriginalName = "resize___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ResizeSrc = "resize___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ResizeTracedSvg = "resize___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ResizeWidth = "resize___width",
}

export type ImageSharpFilterInput = {
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly fixed: InputMaybe<ImageSharpFixedFilterInput>;
    readonly fluid: InputMaybe<ImageSharpFluidFilterInput>;
    readonly gatsbyImageData: InputMaybe<GatsbyImageDataQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly original: InputMaybe<ImageSharpOriginalFilterInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly resize: InputMaybe<ImageSharpResizeFilterInput>;
};

export type ImageSharpFilterListInput = {
    readonly elemMatch: InputMaybe<ImageSharpFilterInput>;
};

export type ImageSharpFixed = {
    readonly __typename?: "ImageSharpFixed";
    readonly aspectRatio: Maybe<Scalars["Float"]>;
    readonly base64: Maybe<Scalars["String"]>;
    readonly height: Scalars["Float"];
    readonly originalName: Maybe<Scalars["String"]>;
    readonly src: Scalars["String"];
    readonly srcSet: Scalars["String"];
    readonly srcSetWebp: Maybe<Scalars["String"]>;
    readonly srcWebp: Maybe<Scalars["String"]>;
    readonly tracedSVG: Maybe<Scalars["String"]>;
    readonly width: Scalars["Float"];
};

export type ImageSharpFixedFilterInput = {
    readonly aspectRatio: InputMaybe<FloatQueryOperatorInput>;
    readonly base64: InputMaybe<StringQueryOperatorInput>;
    readonly height: InputMaybe<FloatQueryOperatorInput>;
    readonly originalName: InputMaybe<StringQueryOperatorInput>;
    readonly src: InputMaybe<StringQueryOperatorInput>;
    readonly srcSet: InputMaybe<StringQueryOperatorInput>;
    readonly srcSetWebp: InputMaybe<StringQueryOperatorInput>;
    readonly srcWebp: InputMaybe<StringQueryOperatorInput>;
    readonly tracedSVG: InputMaybe<StringQueryOperatorInput>;
    readonly width: InputMaybe<FloatQueryOperatorInput>;
};

export type ImageSharpFluid = {
    readonly __typename?: "ImageSharpFluid";
    readonly aspectRatio: Scalars["Float"];
    readonly base64: Maybe<Scalars["String"]>;
    readonly originalImg: Maybe<Scalars["String"]>;
    readonly originalName: Maybe<Scalars["String"]>;
    readonly presentationHeight: Scalars["Int"];
    readonly presentationWidth: Scalars["Int"];
    readonly sizes: Scalars["String"];
    readonly src: Scalars["String"];
    readonly srcSet: Scalars["String"];
    readonly srcSetWebp: Maybe<Scalars["String"]>;
    readonly srcWebp: Maybe<Scalars["String"]>;
    readonly tracedSVG: Maybe<Scalars["String"]>;
};

export type ImageSharpFluidFilterInput = {
    readonly aspectRatio: InputMaybe<FloatQueryOperatorInput>;
    readonly base64: InputMaybe<StringQueryOperatorInput>;
    readonly originalImg: InputMaybe<StringQueryOperatorInput>;
    readonly originalName: InputMaybe<StringQueryOperatorInput>;
    readonly presentationHeight: InputMaybe<IntQueryOperatorInput>;
    readonly presentationWidth: InputMaybe<IntQueryOperatorInput>;
    readonly sizes: InputMaybe<StringQueryOperatorInput>;
    readonly src: InputMaybe<StringQueryOperatorInput>;
    readonly srcSet: InputMaybe<StringQueryOperatorInput>;
    readonly srcSetWebp: InputMaybe<StringQueryOperatorInput>;
    readonly srcWebp: InputMaybe<StringQueryOperatorInput>;
    readonly tracedSVG: InputMaybe<StringQueryOperatorInput>;
};

export type ImageSharpGroupConnection = {
    readonly __typename?: "ImageSharpGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<ImageSharpEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<ImageSharpGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<ImageSharp>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type ImageSharpGroupConnectionDistinctArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpGroupConnectionGroupArgs = {
    field: ImageSharpFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type ImageSharpGroupConnectionMaxArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpGroupConnectionMinArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpGroupConnectionSumArgs = {
    field: ImageSharpFieldsEnum;
};

export type ImageSharpOriginal = {
    readonly __typename?: "ImageSharpOriginal";
    readonly height: Maybe<Scalars["Float"]>;
    readonly src: Maybe<Scalars["String"]>;
    readonly width: Maybe<Scalars["Float"]>;
};

export type ImageSharpOriginalFilterInput = {
    readonly height: InputMaybe<FloatQueryOperatorInput>;
    readonly src: InputMaybe<StringQueryOperatorInput>;
    readonly width: InputMaybe<FloatQueryOperatorInput>;
};

export type ImageSharpResize = {
    readonly __typename?: "ImageSharpResize";
    readonly aspectRatio: Maybe<Scalars["Float"]>;
    readonly height: Maybe<Scalars["Int"]>;
    readonly originalName: Maybe<Scalars["String"]>;
    readonly src: Maybe<Scalars["String"]>;
    readonly tracedSVG: Maybe<Scalars["String"]>;
    readonly width: Maybe<Scalars["Int"]>;
};

export type ImageSharpResizeFilterInput = {
    readonly aspectRatio: InputMaybe<FloatQueryOperatorInput>;
    readonly height: InputMaybe<IntQueryOperatorInput>;
    readonly originalName: InputMaybe<StringQueryOperatorInput>;
    readonly src: InputMaybe<StringQueryOperatorInput>;
    readonly tracedSVG: InputMaybe<StringQueryOperatorInput>;
    readonly width: InputMaybe<IntQueryOperatorInput>;
};

export type ImageSharpSortInput = {
    readonly fields: InputMaybe<
        ReadonlyArray<InputMaybe<ImageSharpFieldsEnum>>
    >;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type IntQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["Int"]>;
    readonly gt: InputMaybe<Scalars["Int"]>;
    readonly gte: InputMaybe<Scalars["Int"]>;
    readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Int"]>>>;
    readonly lt: InputMaybe<Scalars["Int"]>;
    readonly lte: InputMaybe<Scalars["Int"]>;
    readonly ne: InputMaybe<Scalars["Int"]>;
    readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars["Int"]>>>;
};

export type Internal = {
    readonly __typename?: "Internal";
    readonly content: Maybe<Scalars["String"]>;
    readonly contentDigest: Scalars["String"];
    readonly description: Maybe<Scalars["String"]>;
    readonly fieldOwners: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
    readonly ignoreType: Maybe<Scalars["Boolean"]>;
    readonly mediaType: Maybe<Scalars["String"]>;
    readonly owner: Scalars["String"];
    readonly type: Scalars["String"];
};

export type InternalFilterInput = {
    readonly content: InputMaybe<StringQueryOperatorInput>;
    readonly contentDigest: InputMaybe<StringQueryOperatorInput>;
    readonly description: InputMaybe<StringQueryOperatorInput>;
    readonly fieldOwners: InputMaybe<StringQueryOperatorInput>;
    readonly ignoreType: InputMaybe<BooleanQueryOperatorInput>;
    readonly mediaType: InputMaybe<StringQueryOperatorInput>;
    readonly owner: InputMaybe<StringQueryOperatorInput>;
    readonly type: InputMaybe<StringQueryOperatorInput>;
};

export type JpgOptions = {
    readonly progressive: InputMaybe<Scalars["Boolean"]>;
    readonly quality: InputMaybe<Scalars["Int"]>;
};

export type JsonQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["JSON"]>;
    readonly glob: InputMaybe<Scalars["JSON"]>;
    readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars["JSON"]>>>;
    readonly ne: InputMaybe<Scalars["JSON"]>;
    readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars["JSON"]>>>;
    readonly regex: InputMaybe<Scalars["JSON"]>;
};

export enum MarkdownExcerptFormats {
    Html = "HTML",
    Markdown = "MARKDOWN",
    Plain = "PLAIN",
}

export type MarkdownHeading = {
    readonly __typename?: "MarkdownHeading";
    readonly depth: Maybe<Scalars["Int"]>;
    readonly id: Maybe<Scalars["String"]>;
    readonly value: Maybe<Scalars["String"]>;
};

export type MarkdownHeadingFilterInput = {
    readonly depth: InputMaybe<IntQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly value: InputMaybe<StringQueryOperatorInput>;
};

export type MarkdownHeadingFilterListInput = {
    readonly elemMatch: InputMaybe<MarkdownHeadingFilterInput>;
};

export enum MarkdownHeadingLevels {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6",
}

export type MarkdownRemark = Node & {
    readonly __typename?: "MarkdownRemark";
    readonly children: ReadonlyArray<Node>;
    readonly excerpt: Maybe<Scalars["String"]>;
    readonly excerptAst: Maybe<Scalars["JSON"]>;
    readonly fields: Maybe<MarkdownRemarkFields>;
    readonly fileAbsolutePath: Maybe<Scalars["String"]>;
    readonly frontmatter: Maybe<MarkdownRemarkFrontmatter>;
    readonly headings: Maybe<ReadonlyArray<Maybe<MarkdownHeading>>>;
    readonly hero: Maybe<File>;
    readonly html: Maybe<Scalars["String"]>;
    readonly htmlAst: Maybe<Scalars["JSON"]>;
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly parent: Maybe<Node>;
    readonly rawMarkdownBody: Maybe<Scalars["String"]>;
    readonly tableOfContents: Maybe<Scalars["String"]>;
    readonly timeToRead: Maybe<Scalars["Int"]>;
    readonly wordCount: Maybe<MarkdownWordCount>;
};

export type MarkdownRemarkExcerptArgs = {
    format?: InputMaybe<MarkdownExcerptFormats>;
    pruneLength?: InputMaybe<Scalars["Int"]>;
    truncate?: InputMaybe<Scalars["Boolean"]>;
};

export type MarkdownRemarkExcerptAstArgs = {
    pruneLength?: InputMaybe<Scalars["Int"]>;
    truncate?: InputMaybe<Scalars["Boolean"]>;
};

export type MarkdownRemarkHeadingsArgs = {
    depth: InputMaybe<MarkdownHeadingLevels>;
};

export type MarkdownRemarkTableOfContentsArgs = {
    absolute?: InputMaybe<Scalars["Boolean"]>;
    heading: InputMaybe<Scalars["String"]>;
    maxDepth: InputMaybe<Scalars["Int"]>;
    pathToSlugField?: InputMaybe<Scalars["String"]>;
};

export type MarkdownRemarkConnection = {
    readonly __typename?: "MarkdownRemarkConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<MarkdownRemarkEdge>;
    readonly group: ReadonlyArray<MarkdownRemarkGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<MarkdownRemark>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type MarkdownRemarkConnectionDistinctArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionGroupArgs = {
    field: MarkdownRemarkFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type MarkdownRemarkConnectionMaxArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionMinArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkConnectionSumArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkEdge = {
    readonly __typename?: "MarkdownRemarkEdge";
    readonly next: Maybe<MarkdownRemark>;
    readonly node: MarkdownRemark;
    readonly previous: Maybe<MarkdownRemark>;
};

export type MarkdownRemarkFields = {
    readonly __typename?: "MarkdownRemarkFields";
    readonly hero: Maybe<Scalars["String"]>;
    readonly slug: Maybe<Scalars["String"]>;
};

export enum MarkdownRemarkFieldsEnum {
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    Excerpt = "excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    ExcerptAst = "excerptAst",
    FieldsHero = "fields___hero",
    FieldsSlug = "fields___slug",
    FileAbsolutePath = "fileAbsolutePath",
    FrontmatterAuthor = "frontmatter___author",
    FrontmatterCategories = "frontmatter___categories",
    FrontmatterDate = "frontmatter___date",
    FrontmatterExcerpt = "frontmatter___excerpt",
    FrontmatterHero = "frontmatter___hero",
    FrontmatterLang = "frontmatter___lang",
    FrontmatterTitle = "frontmatter___title",
    FrontmatterType = "frontmatter___type",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    Headings = "headings",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeadingsDepth = "headings___depth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeadingsId = "headings___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeadingsValue = "headings___value",
    HeroAbsolutePath = "hero___absolutePath",
    HeroAccessTime = "hero___accessTime",
    HeroAtime = "hero___atime",
    HeroAtimeMs = "hero___atimeMs",
    HeroBase = "hero___base",
    HeroBirthTime = "hero___birthTime",
    HeroBirthtime = "hero___birthtime",
    HeroBirthtimeMs = "hero___birthtimeMs",
    HeroBlksize = "hero___blksize",
    HeroBlocks = "hero___blocks",
    HeroChangeTime = "hero___changeTime",
    HeroChildImageSharpChildren = "hero___childImageSharp___children",
    HeroChildImageSharpChildrenChildren = "hero___childImageSharp___children___children",
    HeroChildImageSharpChildrenId = "hero___childImageSharp___children___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedAspectRatio = "hero___childImageSharp___fixed___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedBase64 = "hero___childImageSharp___fixed___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedHeight = "hero___childImageSharp___fixed___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedOriginalName = "hero___childImageSharp___fixed___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedSrc = "hero___childImageSharp___fixed___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedSrcSet = "hero___childImageSharp___fixed___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedSrcSetWebp = "hero___childImageSharp___fixed___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedSrcWebp = "hero___childImageSharp___fixed___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedTracedSvg = "hero___childImageSharp___fixed___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFixedWidth = "hero___childImageSharp___fixed___width",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidAspectRatio = "hero___childImageSharp___fluid___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidBase64 = "hero___childImageSharp___fluid___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidOriginalImg = "hero___childImageSharp___fluid___originalImg",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidOriginalName = "hero___childImageSharp___fluid___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidPresentationHeight = "hero___childImageSharp___fluid___presentationHeight",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidPresentationWidth = "hero___childImageSharp___fluid___presentationWidth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidSizes = "hero___childImageSharp___fluid___sizes",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidSrc = "hero___childImageSharp___fluid___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidSrcSet = "hero___childImageSharp___fluid___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidSrcSetWebp = "hero___childImageSharp___fluid___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidSrcWebp = "hero___childImageSharp___fluid___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpFluidTracedSvg = "hero___childImageSharp___fluid___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpGatsbyImageData = "hero___childImageSharp___gatsbyImageData",
    HeroChildImageSharpId = "hero___childImageSharp___id",
    HeroChildImageSharpInternalContent = "hero___childImageSharp___internal___content",
    HeroChildImageSharpInternalContentDigest = "hero___childImageSharp___internal___contentDigest",
    HeroChildImageSharpInternalDescription = "hero___childImageSharp___internal___description",
    HeroChildImageSharpInternalFieldOwners = "hero___childImageSharp___internal___fieldOwners",
    HeroChildImageSharpInternalIgnoreType = "hero___childImageSharp___internal___ignoreType",
    HeroChildImageSharpInternalMediaType = "hero___childImageSharp___internal___mediaType",
    HeroChildImageSharpInternalOwner = "hero___childImageSharp___internal___owner",
    HeroChildImageSharpInternalType = "hero___childImageSharp___internal___type",
    HeroChildImageSharpOriginalHeight = "hero___childImageSharp___original___height",
    HeroChildImageSharpOriginalSrc = "hero___childImageSharp___original___src",
    HeroChildImageSharpOriginalWidth = "hero___childImageSharp___original___width",
    HeroChildImageSharpParentChildren = "hero___childImageSharp___parent___children",
    HeroChildImageSharpParentId = "hero___childImageSharp___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpResizeAspectRatio = "hero___childImageSharp___resize___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpResizeHeight = "hero___childImageSharp___resize___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpResizeOriginalName = "hero___childImageSharp___resize___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpResizeSrc = "hero___childImageSharp___resize___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpResizeTracedSvg = "hero___childImageSharp___resize___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildImageSharpResizeWidth = "hero___childImageSharp___resize___width",
    HeroChildMarkdownRemarkChildren = "hero___childMarkdownRemark___children",
    HeroChildMarkdownRemarkChildrenChildren = "hero___childMarkdownRemark___children___children",
    HeroChildMarkdownRemarkChildrenId = "hero___childMarkdownRemark___children___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkExcerpt = "hero___childMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkExcerptAst = "hero___childMarkdownRemark___excerptAst",
    HeroChildMarkdownRemarkFieldsHero = "hero___childMarkdownRemark___fields___hero",
    HeroChildMarkdownRemarkFieldsSlug = "hero___childMarkdownRemark___fields___slug",
    HeroChildMarkdownRemarkFileAbsolutePath = "hero___childMarkdownRemark___fileAbsolutePath",
    HeroChildMarkdownRemarkFrontmatterAuthor = "hero___childMarkdownRemark___frontmatter___author",
    HeroChildMarkdownRemarkFrontmatterCategories = "hero___childMarkdownRemark___frontmatter___categories",
    HeroChildMarkdownRemarkFrontmatterDate = "hero___childMarkdownRemark___frontmatter___date",
    HeroChildMarkdownRemarkFrontmatterExcerpt = "hero___childMarkdownRemark___frontmatter___excerpt",
    HeroChildMarkdownRemarkFrontmatterHero = "hero___childMarkdownRemark___frontmatter___hero",
    HeroChildMarkdownRemarkFrontmatterLang = "hero___childMarkdownRemark___frontmatter___lang",
    HeroChildMarkdownRemarkFrontmatterTitle = "hero___childMarkdownRemark___frontmatter___title",
    HeroChildMarkdownRemarkFrontmatterType = "hero___childMarkdownRemark___frontmatter___type",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkHeadings = "hero___childMarkdownRemark___headings",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkHeadingsDepth = "hero___childMarkdownRemark___headings___depth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkHeadingsId = "hero___childMarkdownRemark___headings___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkHeadingsValue = "hero___childMarkdownRemark___headings___value",
    HeroChildMarkdownRemarkHeroAbsolutePath = "hero___childMarkdownRemark___hero___absolutePath",
    HeroChildMarkdownRemarkHeroAccessTime = "hero___childMarkdownRemark___hero___accessTime",
    HeroChildMarkdownRemarkHeroAtime = "hero___childMarkdownRemark___hero___atime",
    HeroChildMarkdownRemarkHeroAtimeMs = "hero___childMarkdownRemark___hero___atimeMs",
    HeroChildMarkdownRemarkHeroBase = "hero___childMarkdownRemark___hero___base",
    HeroChildMarkdownRemarkHeroBirthTime = "hero___childMarkdownRemark___hero___birthTime",
    HeroChildMarkdownRemarkHeroBirthtime = "hero___childMarkdownRemark___hero___birthtime",
    HeroChildMarkdownRemarkHeroBirthtimeMs = "hero___childMarkdownRemark___hero___birthtimeMs",
    HeroChildMarkdownRemarkHeroBlksize = "hero___childMarkdownRemark___hero___blksize",
    HeroChildMarkdownRemarkHeroBlocks = "hero___childMarkdownRemark___hero___blocks",
    HeroChildMarkdownRemarkHeroChangeTime = "hero___childMarkdownRemark___hero___changeTime",
    HeroChildMarkdownRemarkHeroChildren = "hero___childMarkdownRemark___hero___children",
    HeroChildMarkdownRemarkHeroChildrenImageSharp = "hero___childMarkdownRemark___hero___childrenImageSharp",
    HeroChildMarkdownRemarkHeroChildrenMarkdownRemark = "hero___childMarkdownRemark___hero___childrenMarkdownRemark",
    HeroChildMarkdownRemarkHeroCtime = "hero___childMarkdownRemark___hero___ctime",
    HeroChildMarkdownRemarkHeroCtimeMs = "hero___childMarkdownRemark___hero___ctimeMs",
    HeroChildMarkdownRemarkHeroDev = "hero___childMarkdownRemark___hero___dev",
    HeroChildMarkdownRemarkHeroDir = "hero___childMarkdownRemark___hero___dir",
    HeroChildMarkdownRemarkHeroExt = "hero___childMarkdownRemark___hero___ext",
    HeroChildMarkdownRemarkHeroExtension = "hero___childMarkdownRemark___hero___extension",
    HeroChildMarkdownRemarkHeroGid = "hero___childMarkdownRemark___hero___gid",
    HeroChildMarkdownRemarkHeroId = "hero___childMarkdownRemark___hero___id",
    HeroChildMarkdownRemarkHeroIno = "hero___childMarkdownRemark___hero___ino",
    HeroChildMarkdownRemarkHeroMode = "hero___childMarkdownRemark___hero___mode",
    HeroChildMarkdownRemarkHeroModifiedTime = "hero___childMarkdownRemark___hero___modifiedTime",
    HeroChildMarkdownRemarkHeroMtime = "hero___childMarkdownRemark___hero___mtime",
    HeroChildMarkdownRemarkHeroMtimeMs = "hero___childMarkdownRemark___hero___mtimeMs",
    HeroChildMarkdownRemarkHeroName = "hero___childMarkdownRemark___hero___name",
    HeroChildMarkdownRemarkHeroNlink = "hero___childMarkdownRemark___hero___nlink",
    HeroChildMarkdownRemarkHeroPrettySize = "hero___childMarkdownRemark___hero___prettySize",
    HeroChildMarkdownRemarkHeroPublicUrl = "hero___childMarkdownRemark___hero___publicURL",
    HeroChildMarkdownRemarkHeroRdev = "hero___childMarkdownRemark___hero___rdev",
    HeroChildMarkdownRemarkHeroRelativeDirectory = "hero___childMarkdownRemark___hero___relativeDirectory",
    HeroChildMarkdownRemarkHeroRelativePath = "hero___childMarkdownRemark___hero___relativePath",
    HeroChildMarkdownRemarkHeroRoot = "hero___childMarkdownRemark___hero___root",
    HeroChildMarkdownRemarkHeroSize = "hero___childMarkdownRemark___hero___size",
    HeroChildMarkdownRemarkHeroSourceInstanceName = "hero___childMarkdownRemark___hero___sourceInstanceName",
    HeroChildMarkdownRemarkHeroUid = "hero___childMarkdownRemark___hero___uid",
    HeroChildMarkdownRemarkHeroUrl = "hero___childMarkdownRemark___hero___url",
    HeroChildMarkdownRemarkHtml = "hero___childMarkdownRemark___html",
    HeroChildMarkdownRemarkHtmlAst = "hero___childMarkdownRemark___htmlAst",
    HeroChildMarkdownRemarkId = "hero___childMarkdownRemark___id",
    HeroChildMarkdownRemarkInternalContent = "hero___childMarkdownRemark___internal___content",
    HeroChildMarkdownRemarkInternalContentDigest = "hero___childMarkdownRemark___internal___contentDigest",
    HeroChildMarkdownRemarkInternalDescription = "hero___childMarkdownRemark___internal___description",
    HeroChildMarkdownRemarkInternalFieldOwners = "hero___childMarkdownRemark___internal___fieldOwners",
    HeroChildMarkdownRemarkInternalIgnoreType = "hero___childMarkdownRemark___internal___ignoreType",
    HeroChildMarkdownRemarkInternalMediaType = "hero___childMarkdownRemark___internal___mediaType",
    HeroChildMarkdownRemarkInternalOwner = "hero___childMarkdownRemark___internal___owner",
    HeroChildMarkdownRemarkInternalType = "hero___childMarkdownRemark___internal___type",
    HeroChildMarkdownRemarkParentChildren = "hero___childMarkdownRemark___parent___children",
    HeroChildMarkdownRemarkParentId = "hero___childMarkdownRemark___parent___id",
    HeroChildMarkdownRemarkRawMarkdownBody = "hero___childMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildMarkdownRemarkTableOfContents = "hero___childMarkdownRemark___tableOfContents",
    HeroChildMarkdownRemarkTimeToRead = "hero___childMarkdownRemark___timeToRead",
    HeroChildMarkdownRemarkWordCountParagraphs = "hero___childMarkdownRemark___wordCount___paragraphs",
    HeroChildMarkdownRemarkWordCountSentences = "hero___childMarkdownRemark___wordCount___sentences",
    HeroChildMarkdownRemarkWordCountWords = "hero___childMarkdownRemark___wordCount___words",
    HeroChildren = "hero___children",
    HeroChildrenImageSharp = "hero___childrenImageSharp",
    HeroChildrenImageSharpChildren = "hero___childrenImageSharp___children",
    HeroChildrenImageSharpChildrenChildren = "hero___childrenImageSharp___children___children",
    HeroChildrenImageSharpChildrenId = "hero___childrenImageSharp___children___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedAspectRatio = "hero___childrenImageSharp___fixed___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedBase64 = "hero___childrenImageSharp___fixed___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedHeight = "hero___childrenImageSharp___fixed___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedOriginalName = "hero___childrenImageSharp___fixed___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedSrc = "hero___childrenImageSharp___fixed___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedSrcSet = "hero___childrenImageSharp___fixed___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedSrcSetWebp = "hero___childrenImageSharp___fixed___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedSrcWebp = "hero___childrenImageSharp___fixed___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedTracedSvg = "hero___childrenImageSharp___fixed___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFixedWidth = "hero___childrenImageSharp___fixed___width",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidAspectRatio = "hero___childrenImageSharp___fluid___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidBase64 = "hero___childrenImageSharp___fluid___base64",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidOriginalImg = "hero___childrenImageSharp___fluid___originalImg",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidOriginalName = "hero___childrenImageSharp___fluid___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidPresentationHeight = "hero___childrenImageSharp___fluid___presentationHeight",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidPresentationWidth = "hero___childrenImageSharp___fluid___presentationWidth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidSizes = "hero___childrenImageSharp___fluid___sizes",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidSrc = "hero___childrenImageSharp___fluid___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidSrcSet = "hero___childrenImageSharp___fluid___srcSet",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidSrcSetWebp = "hero___childrenImageSharp___fluid___srcSetWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidSrcWebp = "hero___childrenImageSharp___fluid___srcWebp",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpFluidTracedSvg = "hero___childrenImageSharp___fluid___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpGatsbyImageData = "hero___childrenImageSharp___gatsbyImageData",
    HeroChildrenImageSharpId = "hero___childrenImageSharp___id",
    HeroChildrenImageSharpInternalContent = "hero___childrenImageSharp___internal___content",
    HeroChildrenImageSharpInternalContentDigest = "hero___childrenImageSharp___internal___contentDigest",
    HeroChildrenImageSharpInternalDescription = "hero___childrenImageSharp___internal___description",
    HeroChildrenImageSharpInternalFieldOwners = "hero___childrenImageSharp___internal___fieldOwners",
    HeroChildrenImageSharpInternalIgnoreType = "hero___childrenImageSharp___internal___ignoreType",
    HeroChildrenImageSharpInternalMediaType = "hero___childrenImageSharp___internal___mediaType",
    HeroChildrenImageSharpInternalOwner = "hero___childrenImageSharp___internal___owner",
    HeroChildrenImageSharpInternalType = "hero___childrenImageSharp___internal___type",
    HeroChildrenImageSharpOriginalHeight = "hero___childrenImageSharp___original___height",
    HeroChildrenImageSharpOriginalSrc = "hero___childrenImageSharp___original___src",
    HeroChildrenImageSharpOriginalWidth = "hero___childrenImageSharp___original___width",
    HeroChildrenImageSharpParentChildren = "hero___childrenImageSharp___parent___children",
    HeroChildrenImageSharpParentId = "hero___childrenImageSharp___parent___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpResizeAspectRatio = "hero___childrenImageSharp___resize___aspectRatio",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpResizeHeight = "hero___childrenImageSharp___resize___height",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpResizeOriginalName = "hero___childrenImageSharp___resize___originalName",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpResizeSrc = "hero___childrenImageSharp___resize___src",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpResizeTracedSvg = "hero___childrenImageSharp___resize___tracedSVG",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenImageSharpResizeWidth = "hero___childrenImageSharp___resize___width",
    HeroChildrenMarkdownRemark = "hero___childrenMarkdownRemark",
    HeroChildrenMarkdownRemarkChildren = "hero___childrenMarkdownRemark___children",
    HeroChildrenMarkdownRemarkChildrenChildren = "hero___childrenMarkdownRemark___children___children",
    HeroChildrenMarkdownRemarkChildrenId = "hero___childrenMarkdownRemark___children___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkExcerpt = "hero___childrenMarkdownRemark___excerpt",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkExcerptAst = "hero___childrenMarkdownRemark___excerptAst",
    HeroChildrenMarkdownRemarkFieldsHero = "hero___childrenMarkdownRemark___fields___hero",
    HeroChildrenMarkdownRemarkFieldsSlug = "hero___childrenMarkdownRemark___fields___slug",
    HeroChildrenMarkdownRemarkFileAbsolutePath = "hero___childrenMarkdownRemark___fileAbsolutePath",
    HeroChildrenMarkdownRemarkFrontmatterAuthor = "hero___childrenMarkdownRemark___frontmatter___author",
    HeroChildrenMarkdownRemarkFrontmatterCategories = "hero___childrenMarkdownRemark___frontmatter___categories",
    HeroChildrenMarkdownRemarkFrontmatterDate = "hero___childrenMarkdownRemark___frontmatter___date",
    HeroChildrenMarkdownRemarkFrontmatterExcerpt = "hero___childrenMarkdownRemark___frontmatter___excerpt",
    HeroChildrenMarkdownRemarkFrontmatterHero = "hero___childrenMarkdownRemark___frontmatter___hero",
    HeroChildrenMarkdownRemarkFrontmatterLang = "hero___childrenMarkdownRemark___frontmatter___lang",
    HeroChildrenMarkdownRemarkFrontmatterTitle = "hero___childrenMarkdownRemark___frontmatter___title",
    HeroChildrenMarkdownRemarkFrontmatterType = "hero___childrenMarkdownRemark___frontmatter___type",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkHeadings = "hero___childrenMarkdownRemark___headings",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkHeadingsDepth = "hero___childrenMarkdownRemark___headings___depth",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkHeadingsId = "hero___childrenMarkdownRemark___headings___id",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkHeadingsValue = "hero___childrenMarkdownRemark___headings___value",
    HeroChildrenMarkdownRemarkHeroAbsolutePath = "hero___childrenMarkdownRemark___hero___absolutePath",
    HeroChildrenMarkdownRemarkHeroAccessTime = "hero___childrenMarkdownRemark___hero___accessTime",
    HeroChildrenMarkdownRemarkHeroAtime = "hero___childrenMarkdownRemark___hero___atime",
    HeroChildrenMarkdownRemarkHeroAtimeMs = "hero___childrenMarkdownRemark___hero___atimeMs",
    HeroChildrenMarkdownRemarkHeroBase = "hero___childrenMarkdownRemark___hero___base",
    HeroChildrenMarkdownRemarkHeroBirthTime = "hero___childrenMarkdownRemark___hero___birthTime",
    HeroChildrenMarkdownRemarkHeroBirthtime = "hero___childrenMarkdownRemark___hero___birthtime",
    HeroChildrenMarkdownRemarkHeroBirthtimeMs = "hero___childrenMarkdownRemark___hero___birthtimeMs",
    HeroChildrenMarkdownRemarkHeroBlksize = "hero___childrenMarkdownRemark___hero___blksize",
    HeroChildrenMarkdownRemarkHeroBlocks = "hero___childrenMarkdownRemark___hero___blocks",
    HeroChildrenMarkdownRemarkHeroChangeTime = "hero___childrenMarkdownRemark___hero___changeTime",
    HeroChildrenMarkdownRemarkHeroChildren = "hero___childrenMarkdownRemark___hero___children",
    HeroChildrenMarkdownRemarkHeroChildrenImageSharp = "hero___childrenMarkdownRemark___hero___childrenImageSharp",
    HeroChildrenMarkdownRemarkHeroChildrenMarkdownRemark = "hero___childrenMarkdownRemark___hero___childrenMarkdownRemark",
    HeroChildrenMarkdownRemarkHeroCtime = "hero___childrenMarkdownRemark___hero___ctime",
    HeroChildrenMarkdownRemarkHeroCtimeMs = "hero___childrenMarkdownRemark___hero___ctimeMs",
    HeroChildrenMarkdownRemarkHeroDev = "hero___childrenMarkdownRemark___hero___dev",
    HeroChildrenMarkdownRemarkHeroDir = "hero___childrenMarkdownRemark___hero___dir",
    HeroChildrenMarkdownRemarkHeroExt = "hero___childrenMarkdownRemark___hero___ext",
    HeroChildrenMarkdownRemarkHeroExtension = "hero___childrenMarkdownRemark___hero___extension",
    HeroChildrenMarkdownRemarkHeroGid = "hero___childrenMarkdownRemark___hero___gid",
    HeroChildrenMarkdownRemarkHeroId = "hero___childrenMarkdownRemark___hero___id",
    HeroChildrenMarkdownRemarkHeroIno = "hero___childrenMarkdownRemark___hero___ino",
    HeroChildrenMarkdownRemarkHeroMode = "hero___childrenMarkdownRemark___hero___mode",
    HeroChildrenMarkdownRemarkHeroModifiedTime = "hero___childrenMarkdownRemark___hero___modifiedTime",
    HeroChildrenMarkdownRemarkHeroMtime = "hero___childrenMarkdownRemark___hero___mtime",
    HeroChildrenMarkdownRemarkHeroMtimeMs = "hero___childrenMarkdownRemark___hero___mtimeMs",
    HeroChildrenMarkdownRemarkHeroName = "hero___childrenMarkdownRemark___hero___name",
    HeroChildrenMarkdownRemarkHeroNlink = "hero___childrenMarkdownRemark___hero___nlink",
    HeroChildrenMarkdownRemarkHeroPrettySize = "hero___childrenMarkdownRemark___hero___prettySize",
    HeroChildrenMarkdownRemarkHeroPublicUrl = "hero___childrenMarkdownRemark___hero___publicURL",
    HeroChildrenMarkdownRemarkHeroRdev = "hero___childrenMarkdownRemark___hero___rdev",
    HeroChildrenMarkdownRemarkHeroRelativeDirectory = "hero___childrenMarkdownRemark___hero___relativeDirectory",
    HeroChildrenMarkdownRemarkHeroRelativePath = "hero___childrenMarkdownRemark___hero___relativePath",
    HeroChildrenMarkdownRemarkHeroRoot = "hero___childrenMarkdownRemark___hero___root",
    HeroChildrenMarkdownRemarkHeroSize = "hero___childrenMarkdownRemark___hero___size",
    HeroChildrenMarkdownRemarkHeroSourceInstanceName = "hero___childrenMarkdownRemark___hero___sourceInstanceName",
    HeroChildrenMarkdownRemarkHeroUid = "hero___childrenMarkdownRemark___hero___uid",
    HeroChildrenMarkdownRemarkHeroUrl = "hero___childrenMarkdownRemark___hero___url",
    HeroChildrenMarkdownRemarkHtml = "hero___childrenMarkdownRemark___html",
    HeroChildrenMarkdownRemarkHtmlAst = "hero___childrenMarkdownRemark___htmlAst",
    HeroChildrenMarkdownRemarkId = "hero___childrenMarkdownRemark___id",
    HeroChildrenMarkdownRemarkInternalContent = "hero___childrenMarkdownRemark___internal___content",
    HeroChildrenMarkdownRemarkInternalContentDigest = "hero___childrenMarkdownRemark___internal___contentDigest",
    HeroChildrenMarkdownRemarkInternalDescription = "hero___childrenMarkdownRemark___internal___description",
    HeroChildrenMarkdownRemarkInternalFieldOwners = "hero___childrenMarkdownRemark___internal___fieldOwners",
    HeroChildrenMarkdownRemarkInternalIgnoreType = "hero___childrenMarkdownRemark___internal___ignoreType",
    HeroChildrenMarkdownRemarkInternalMediaType = "hero___childrenMarkdownRemark___internal___mediaType",
    HeroChildrenMarkdownRemarkInternalOwner = "hero___childrenMarkdownRemark___internal___owner",
    HeroChildrenMarkdownRemarkInternalType = "hero___childrenMarkdownRemark___internal___type",
    HeroChildrenMarkdownRemarkParentChildren = "hero___childrenMarkdownRemark___parent___children",
    HeroChildrenMarkdownRemarkParentId = "hero___childrenMarkdownRemark___parent___id",
    HeroChildrenMarkdownRemarkRawMarkdownBody = "hero___childrenMarkdownRemark___rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    HeroChildrenMarkdownRemarkTableOfContents = "hero___childrenMarkdownRemark___tableOfContents",
    HeroChildrenMarkdownRemarkTimeToRead = "hero___childrenMarkdownRemark___timeToRead",
    HeroChildrenMarkdownRemarkWordCountParagraphs = "hero___childrenMarkdownRemark___wordCount___paragraphs",
    HeroChildrenMarkdownRemarkWordCountSentences = "hero___childrenMarkdownRemark___wordCount___sentences",
    HeroChildrenMarkdownRemarkWordCountWords = "hero___childrenMarkdownRemark___wordCount___words",
    HeroChildrenChildren = "hero___children___children",
    HeroChildrenChildrenChildren = "hero___children___children___children",
    HeroChildrenChildrenId = "hero___children___children___id",
    HeroChildrenId = "hero___children___id",
    HeroChildrenInternalContent = "hero___children___internal___content",
    HeroChildrenInternalContentDigest = "hero___children___internal___contentDigest",
    HeroChildrenInternalDescription = "hero___children___internal___description",
    HeroChildrenInternalFieldOwners = "hero___children___internal___fieldOwners",
    HeroChildrenInternalIgnoreType = "hero___children___internal___ignoreType",
    HeroChildrenInternalMediaType = "hero___children___internal___mediaType",
    HeroChildrenInternalOwner = "hero___children___internal___owner",
    HeroChildrenInternalType = "hero___children___internal___type",
    HeroChildrenParentChildren = "hero___children___parent___children",
    HeroChildrenParentId = "hero___children___parent___id",
    HeroCtime = "hero___ctime",
    HeroCtimeMs = "hero___ctimeMs",
    HeroDev = "hero___dev",
    HeroDir = "hero___dir",
    HeroExt = "hero___ext",
    HeroExtension = "hero___extension",
    HeroGid = "hero___gid",
    HeroId = "hero___id",
    HeroIno = "hero___ino",
    HeroInternalContent = "hero___internal___content",
    HeroInternalContentDigest = "hero___internal___contentDigest",
    HeroInternalDescription = "hero___internal___description",
    HeroInternalFieldOwners = "hero___internal___fieldOwners",
    HeroInternalIgnoreType = "hero___internal___ignoreType",
    HeroInternalMediaType = "hero___internal___mediaType",
    HeroInternalOwner = "hero___internal___owner",
    HeroInternalType = "hero___internal___type",
    HeroMode = "hero___mode",
    HeroModifiedTime = "hero___modifiedTime",
    HeroMtime = "hero___mtime",
    HeroMtimeMs = "hero___mtimeMs",
    HeroName = "hero___name",
    HeroNlink = "hero___nlink",
    HeroParentChildren = "hero___parent___children",
    HeroParentChildrenChildren = "hero___parent___children___children",
    HeroParentChildrenId = "hero___parent___children___id",
    HeroParentId = "hero___parent___id",
    HeroParentInternalContent = "hero___parent___internal___content",
    HeroParentInternalContentDigest = "hero___parent___internal___contentDigest",
    HeroParentInternalDescription = "hero___parent___internal___description",
    HeroParentInternalFieldOwners = "hero___parent___internal___fieldOwners",
    HeroParentInternalIgnoreType = "hero___parent___internal___ignoreType",
    HeroParentInternalMediaType = "hero___parent___internal___mediaType",
    HeroParentInternalOwner = "hero___parent___internal___owner",
    HeroParentInternalType = "hero___parent___internal___type",
    HeroParentParentChildren = "hero___parent___parent___children",
    HeroParentParentId = "hero___parent___parent___id",
    HeroPrettySize = "hero___prettySize",
    HeroPublicUrl = "hero___publicURL",
    HeroRdev = "hero___rdev",
    HeroRelativeDirectory = "hero___relativeDirectory",
    HeroRelativePath = "hero___relativePath",
    HeroRoot = "hero___root",
    HeroSize = "hero___size",
    HeroSourceInstanceName = "hero___sourceInstanceName",
    HeroUid = "hero___uid",
    HeroUrl = "hero___url",
    Html = "html",
    HtmlAst = "htmlAst",
    Id = "id",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    RawMarkdownBody = "rawMarkdownBody",
    /** @deprecated Sorting on fields that need arguments to resolve is deprecated. */
    TableOfContents = "tableOfContents",
    TimeToRead = "timeToRead",
    WordCountParagraphs = "wordCount___paragraphs",
    WordCountSentences = "wordCount___sentences",
    WordCountWords = "wordCount___words",
}

export type MarkdownRemarkFieldsFilterInput = {
    readonly hero: InputMaybe<StringQueryOperatorInput>;
    readonly slug: InputMaybe<StringQueryOperatorInput>;
};

export type MarkdownRemarkFilterInput = {
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly excerpt: InputMaybe<StringQueryOperatorInput>;
    readonly excerptAst: InputMaybe<JsonQueryOperatorInput>;
    readonly fields: InputMaybe<MarkdownRemarkFieldsFilterInput>;
    readonly fileAbsolutePath: InputMaybe<StringQueryOperatorInput>;
    readonly frontmatter: InputMaybe<MarkdownRemarkFrontmatterFilterInput>;
    readonly headings: InputMaybe<MarkdownHeadingFilterListInput>;
    readonly hero: InputMaybe<FileFilterInput>;
    readonly html: InputMaybe<StringQueryOperatorInput>;
    readonly htmlAst: InputMaybe<JsonQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly rawMarkdownBody: InputMaybe<StringQueryOperatorInput>;
    readonly tableOfContents: InputMaybe<StringQueryOperatorInput>;
    readonly timeToRead: InputMaybe<IntQueryOperatorInput>;
    readonly wordCount: InputMaybe<MarkdownWordCountFilterInput>;
};

export type MarkdownRemarkFilterListInput = {
    readonly elemMatch: InputMaybe<MarkdownRemarkFilterInput>;
};

export type MarkdownRemarkFrontmatter = {
    readonly __typename?: "MarkdownRemarkFrontmatter";
    readonly author: Maybe<Scalars["String"]>;
    readonly categories: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
    readonly date: Maybe<Scalars["Date"]>;
    readonly excerpt: Maybe<Scalars["String"]>;
    readonly hero: Maybe<Scalars["String"]>;
    readonly lang: Maybe<Scalars["String"]>;
    readonly title: Maybe<Scalars["String"]>;
    readonly type: Maybe<Scalars["String"]>;
};

export type MarkdownRemarkFrontmatterDateArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type MarkdownRemarkFrontmatterFilterInput = {
    readonly author: InputMaybe<StringQueryOperatorInput>;
    readonly categories: InputMaybe<StringQueryOperatorInput>;
    readonly date: InputMaybe<DateQueryOperatorInput>;
    readonly excerpt: InputMaybe<StringQueryOperatorInput>;
    readonly hero: InputMaybe<StringQueryOperatorInput>;
    readonly lang: InputMaybe<StringQueryOperatorInput>;
    readonly title: InputMaybe<StringQueryOperatorInput>;
    readonly type: InputMaybe<StringQueryOperatorInput>;
};

export type MarkdownRemarkGroupConnection = {
    readonly __typename?: "MarkdownRemarkGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<MarkdownRemarkEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<MarkdownRemarkGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<MarkdownRemark>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type MarkdownRemarkGroupConnectionDistinctArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkGroupConnectionGroupArgs = {
    field: MarkdownRemarkFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type MarkdownRemarkGroupConnectionMaxArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkGroupConnectionMinArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkGroupConnectionSumArgs = {
    field: MarkdownRemarkFieldsEnum;
};

export type MarkdownRemarkSortInput = {
    readonly fields: InputMaybe<
        ReadonlyArray<InputMaybe<MarkdownRemarkFieldsEnum>>
    >;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type MarkdownWordCount = {
    readonly __typename?: "MarkdownWordCount";
    readonly paragraphs: Maybe<Scalars["Int"]>;
    readonly sentences: Maybe<Scalars["Int"]>;
    readonly words: Maybe<Scalars["Int"]>;
};

export type MarkdownWordCountFilterInput = {
    readonly paragraphs: InputMaybe<IntQueryOperatorInput>;
    readonly sentences: InputMaybe<IntQueryOperatorInput>;
    readonly words: InputMaybe<IntQueryOperatorInput>;
};

/** Node Interface */
export type Node = {
    readonly children: ReadonlyArray<Node>;
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly parent: Maybe<Node>;
};

export type NodeFilterInput = {
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
};

export type NodeFilterListInput = {
    readonly elemMatch: InputMaybe<NodeFilterInput>;
};

export type PngOptions = {
    readonly compressionSpeed: InputMaybe<Scalars["Int"]>;
    readonly quality: InputMaybe<Scalars["Int"]>;
};

export type PageInfo = {
    readonly __typename?: "PageInfo";
    readonly currentPage: Scalars["Int"];
    readonly hasNextPage: Scalars["Boolean"];
    readonly hasPreviousPage: Scalars["Boolean"];
    readonly itemCount: Scalars["Int"];
    readonly pageCount: Scalars["Int"];
    readonly perPage: Maybe<Scalars["Int"]>;
    readonly totalCount: Scalars["Int"];
};

export type Potrace = {
    readonly alphaMax: InputMaybe<Scalars["Float"]>;
    readonly background: InputMaybe<Scalars["String"]>;
    readonly blackOnWhite: InputMaybe<Scalars["Boolean"]>;
    readonly color: InputMaybe<Scalars["String"]>;
    readonly optCurve: InputMaybe<Scalars["Boolean"]>;
    readonly optTolerance: InputMaybe<Scalars["Float"]>;
    readonly threshold: InputMaybe<Scalars["Int"]>;
    readonly turdSize: InputMaybe<Scalars["Float"]>;
    readonly turnPolicy: InputMaybe<PotraceTurnPolicy>;
};

export enum PotraceTurnPolicy {
    TurnpolicyBlack = "TURNPOLICY_BLACK",
    TurnpolicyLeft = "TURNPOLICY_LEFT",
    TurnpolicyMajority = "TURNPOLICY_MAJORITY",
    TurnpolicyMinority = "TURNPOLICY_MINORITY",
    TurnpolicyRight = "TURNPOLICY_RIGHT",
    TurnpolicyWhite = "TURNPOLICY_WHITE",
}

export type Query = {
    readonly __typename?: "Query";
    readonly allDirectory: DirectoryConnection;
    readonly allFile: FileConnection;
    readonly allImageSharp: ImageSharpConnection;
    readonly allMarkdownRemark: MarkdownRemarkConnection;
    readonly allSite: SiteConnection;
    readonly allSiteBuildMetadata: SiteBuildMetadataConnection;
    readonly allSiteFunction: SiteFunctionConnection;
    readonly allSitePage: SitePageConnection;
    readonly allSitePlugin: SitePluginConnection;
    readonly directory: Maybe<Directory>;
    readonly file: Maybe<File>;
    readonly imageSharp: Maybe<ImageSharp>;
    readonly markdownRemark: Maybe<MarkdownRemark>;
    readonly site: Maybe<Site>;
    readonly siteBuildMetadata: Maybe<SiteBuildMetadata>;
    readonly siteFunction: Maybe<SiteFunction>;
    readonly sitePage: Maybe<SitePage>;
    readonly sitePlugin: Maybe<SitePlugin>;
};

export type QueryAllDirectoryArgs = {
    filter: InputMaybe<DirectoryFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<DirectorySortInput>;
};

export type QueryAllFileArgs = {
    filter: InputMaybe<FileFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<FileSortInput>;
};

export type QueryAllImageSharpArgs = {
    filter: InputMaybe<ImageSharpFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<ImageSharpSortInput>;
};

export type QueryAllMarkdownRemarkArgs = {
    filter: InputMaybe<MarkdownRemarkFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<MarkdownRemarkSortInput>;
};

export type QueryAllSiteArgs = {
    filter: InputMaybe<SiteFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<SiteSortInput>;
};

export type QueryAllSiteBuildMetadataArgs = {
    filter: InputMaybe<SiteBuildMetadataFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<SiteBuildMetadataSortInput>;
};

export type QueryAllSiteFunctionArgs = {
    filter: InputMaybe<SiteFunctionFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<SiteFunctionSortInput>;
};

export type QueryAllSitePageArgs = {
    filter: InputMaybe<SitePageFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<SitePageSortInput>;
};

export type QueryAllSitePluginArgs = {
    filter: InputMaybe<SitePluginFilterInput>;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
    sort: InputMaybe<SitePluginSortInput>;
};

export type QueryDirectoryArgs = {
    absolutePath: InputMaybe<StringQueryOperatorInput>;
    accessTime: InputMaybe<DateQueryOperatorInput>;
    atime: InputMaybe<DateQueryOperatorInput>;
    atimeMs: InputMaybe<FloatQueryOperatorInput>;
    base: InputMaybe<StringQueryOperatorInput>;
    birthTime: InputMaybe<DateQueryOperatorInput>;
    birthtime: InputMaybe<DateQueryOperatorInput>;
    birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
    changeTime: InputMaybe<DateQueryOperatorInput>;
    children: InputMaybe<NodeFilterListInput>;
    ctime: InputMaybe<DateQueryOperatorInput>;
    ctimeMs: InputMaybe<FloatQueryOperatorInput>;
    dev: InputMaybe<IntQueryOperatorInput>;
    dir: InputMaybe<StringQueryOperatorInput>;
    ext: InputMaybe<StringQueryOperatorInput>;
    extension: InputMaybe<StringQueryOperatorInput>;
    gid: InputMaybe<IntQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    ino: InputMaybe<FloatQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    mode: InputMaybe<IntQueryOperatorInput>;
    modifiedTime: InputMaybe<DateQueryOperatorInput>;
    mtime: InputMaybe<DateQueryOperatorInput>;
    mtimeMs: InputMaybe<FloatQueryOperatorInput>;
    name: InputMaybe<StringQueryOperatorInput>;
    nlink: InputMaybe<IntQueryOperatorInput>;
    parent: InputMaybe<NodeFilterInput>;
    prettySize: InputMaybe<StringQueryOperatorInput>;
    rdev: InputMaybe<IntQueryOperatorInput>;
    relativeDirectory: InputMaybe<StringQueryOperatorInput>;
    relativePath: InputMaybe<StringQueryOperatorInput>;
    root: InputMaybe<StringQueryOperatorInput>;
    size: InputMaybe<IntQueryOperatorInput>;
    sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
    uid: InputMaybe<IntQueryOperatorInput>;
};

export type QueryFileArgs = {
    absolutePath: InputMaybe<StringQueryOperatorInput>;
    accessTime: InputMaybe<DateQueryOperatorInput>;
    atime: InputMaybe<DateQueryOperatorInput>;
    atimeMs: InputMaybe<FloatQueryOperatorInput>;
    base: InputMaybe<StringQueryOperatorInput>;
    birthTime: InputMaybe<DateQueryOperatorInput>;
    birthtime: InputMaybe<DateQueryOperatorInput>;
    birthtimeMs: InputMaybe<FloatQueryOperatorInput>;
    blksize: InputMaybe<IntQueryOperatorInput>;
    blocks: InputMaybe<IntQueryOperatorInput>;
    changeTime: InputMaybe<DateQueryOperatorInput>;
    childImageSharp: InputMaybe<ImageSharpFilterInput>;
    childMarkdownRemark: InputMaybe<MarkdownRemarkFilterInput>;
    children: InputMaybe<NodeFilterListInput>;
    childrenImageSharp: InputMaybe<ImageSharpFilterListInput>;
    childrenMarkdownRemark: InputMaybe<MarkdownRemarkFilterListInput>;
    ctime: InputMaybe<DateQueryOperatorInput>;
    ctimeMs: InputMaybe<FloatQueryOperatorInput>;
    dev: InputMaybe<IntQueryOperatorInput>;
    dir: InputMaybe<StringQueryOperatorInput>;
    ext: InputMaybe<StringQueryOperatorInput>;
    extension: InputMaybe<StringQueryOperatorInput>;
    gid: InputMaybe<IntQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    ino: InputMaybe<FloatQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    mode: InputMaybe<IntQueryOperatorInput>;
    modifiedTime: InputMaybe<DateQueryOperatorInput>;
    mtime: InputMaybe<DateQueryOperatorInput>;
    mtimeMs: InputMaybe<FloatQueryOperatorInput>;
    name: InputMaybe<StringQueryOperatorInput>;
    nlink: InputMaybe<IntQueryOperatorInput>;
    parent: InputMaybe<NodeFilterInput>;
    prettySize: InputMaybe<StringQueryOperatorInput>;
    publicURL: InputMaybe<StringQueryOperatorInput>;
    rdev: InputMaybe<IntQueryOperatorInput>;
    relativeDirectory: InputMaybe<StringQueryOperatorInput>;
    relativePath: InputMaybe<StringQueryOperatorInput>;
    root: InputMaybe<StringQueryOperatorInput>;
    size: InputMaybe<IntQueryOperatorInput>;
    sourceInstanceName: InputMaybe<StringQueryOperatorInput>;
    uid: InputMaybe<IntQueryOperatorInput>;
    url: InputMaybe<StringQueryOperatorInput>;
};

export type QueryImageSharpArgs = {
    children: InputMaybe<NodeFilterListInput>;
    fixed: InputMaybe<ImageSharpFixedFilterInput>;
    fluid: InputMaybe<ImageSharpFluidFilterInput>;
    gatsbyImageData: InputMaybe<GatsbyImageDataQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    original: InputMaybe<ImageSharpOriginalFilterInput>;
    parent: InputMaybe<NodeFilterInput>;
    resize: InputMaybe<ImageSharpResizeFilterInput>;
};

export type QueryMarkdownRemarkArgs = {
    children: InputMaybe<NodeFilterListInput>;
    excerpt: InputMaybe<StringQueryOperatorInput>;
    excerptAst: InputMaybe<JsonQueryOperatorInput>;
    fields: InputMaybe<MarkdownRemarkFieldsFilterInput>;
    fileAbsolutePath: InputMaybe<StringQueryOperatorInput>;
    frontmatter: InputMaybe<MarkdownRemarkFrontmatterFilterInput>;
    headings: InputMaybe<MarkdownHeadingFilterListInput>;
    hero: InputMaybe<FileFilterInput>;
    html: InputMaybe<StringQueryOperatorInput>;
    htmlAst: InputMaybe<JsonQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    parent: InputMaybe<NodeFilterInput>;
    rawMarkdownBody: InputMaybe<StringQueryOperatorInput>;
    tableOfContents: InputMaybe<StringQueryOperatorInput>;
    timeToRead: InputMaybe<IntQueryOperatorInput>;
    wordCount: InputMaybe<MarkdownWordCountFilterInput>;
};

export type QuerySiteArgs = {
    buildTime: InputMaybe<DateQueryOperatorInput>;
    children: InputMaybe<NodeFilterListInput>;
    flags: InputMaybe<SiteFlagsFilterInput>;
    graphqlTypegen: InputMaybe<BooleanQueryOperatorInput>;
    host: InputMaybe<StringQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    jsxRuntime: InputMaybe<StringQueryOperatorInput>;
    parent: InputMaybe<NodeFilterInput>;
    pathPrefix: InputMaybe<StringQueryOperatorInput>;
    polyfill: InputMaybe<BooleanQueryOperatorInput>;
    port: InputMaybe<IntQueryOperatorInput>;
    siteMetadata: InputMaybe<SiteSiteMetadataFilterInput>;
    trailingSlash: InputMaybe<StringQueryOperatorInput>;
};

export type QuerySiteBuildMetadataArgs = {
    buildTime: InputMaybe<DateQueryOperatorInput>;
    children: InputMaybe<NodeFilterListInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    parent: InputMaybe<NodeFilterInput>;
};

export type QuerySiteFunctionArgs = {
    absoluteCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
    children: InputMaybe<NodeFilterListInput>;
    functionRoute: InputMaybe<StringQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    matchPath: InputMaybe<StringQueryOperatorInput>;
    originalAbsoluteFilePath: InputMaybe<StringQueryOperatorInput>;
    originalRelativeFilePath: InputMaybe<StringQueryOperatorInput>;
    parent: InputMaybe<NodeFilterInput>;
    pluginName: InputMaybe<StringQueryOperatorInput>;
    relativeCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
};

export type QuerySitePageArgs = {
    children: InputMaybe<NodeFilterListInput>;
    component: InputMaybe<StringQueryOperatorInput>;
    componentChunkName: InputMaybe<StringQueryOperatorInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    internalComponentName: InputMaybe<StringQueryOperatorInput>;
    matchPath: InputMaybe<StringQueryOperatorInput>;
    pageContext: InputMaybe<JsonQueryOperatorInput>;
    parent: InputMaybe<NodeFilterInput>;
    path: InputMaybe<StringQueryOperatorInput>;
    pluginCreator: InputMaybe<SitePluginFilterInput>;
};

export type QuerySitePluginArgs = {
    browserAPIs: InputMaybe<StringQueryOperatorInput>;
    children: InputMaybe<NodeFilterListInput>;
    id: InputMaybe<StringQueryOperatorInput>;
    internal: InputMaybe<InternalFilterInput>;
    name: InputMaybe<StringQueryOperatorInput>;
    nodeAPIs: InputMaybe<StringQueryOperatorInput>;
    packageJson: InputMaybe<JsonQueryOperatorInput>;
    parent: InputMaybe<NodeFilterInput>;
    pluginFilepath: InputMaybe<StringQueryOperatorInput>;
    pluginOptions: InputMaybe<JsonQueryOperatorInput>;
    resolve: InputMaybe<StringQueryOperatorInput>;
    ssrAPIs: InputMaybe<StringQueryOperatorInput>;
    version: InputMaybe<StringQueryOperatorInput>;
};

export type Site = Node & {
    readonly __typename?: "Site";
    readonly buildTime: Maybe<Scalars["Date"]>;
    readonly children: ReadonlyArray<Node>;
    readonly flags: Maybe<SiteFlags>;
    readonly graphqlTypegen: Maybe<Scalars["Boolean"]>;
    readonly host: Maybe<Scalars["String"]>;
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly jsxRuntime: Maybe<Scalars["String"]>;
    readonly parent: Maybe<Node>;
    readonly pathPrefix: Maybe<Scalars["String"]>;
    readonly polyfill: Maybe<Scalars["Boolean"]>;
    readonly port: Maybe<Scalars["Int"]>;
    readonly siteMetadata: Maybe<SiteSiteMetadata>;
    readonly trailingSlash: Maybe<Scalars["String"]>;
};

export type SiteBuildTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type SiteBuildMetadata = Node & {
    readonly __typename?: "SiteBuildMetadata";
    readonly buildTime: Maybe<Scalars["Date"]>;
    readonly children: ReadonlyArray<Node>;
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly parent: Maybe<Node>;
};

export type SiteBuildMetadataBuildTimeArgs = {
    difference: InputMaybe<Scalars["String"]>;
    formatString: InputMaybe<Scalars["String"]>;
    fromNow: InputMaybe<Scalars["Boolean"]>;
    locale: InputMaybe<Scalars["String"]>;
};

export type SiteBuildMetadataConnection = {
    readonly __typename?: "SiteBuildMetadataConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
    readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SiteBuildMetadata>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SiteBuildMetadataConnectionDistinctArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionGroupArgs = {
    field: SiteBuildMetadataFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SiteBuildMetadataConnectionMaxArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionMinArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataConnectionSumArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
    readonly __typename?: "SiteBuildMetadataEdge";
    readonly next: Maybe<SiteBuildMetadata>;
    readonly node: SiteBuildMetadata;
    readonly previous: Maybe<SiteBuildMetadata>;
};

export enum SiteBuildMetadataFieldsEnum {
    BuildTime = "buildTime",
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    Id = "id",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
}

export type SiteBuildMetadataFilterInput = {
    readonly buildTime: InputMaybe<DateQueryOperatorInput>;
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
};

export type SiteBuildMetadataGroupConnection = {
    readonly __typename?: "SiteBuildMetadataGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SiteBuildMetadata>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SiteBuildMetadataGroupConnectionDistinctArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataGroupConnectionGroupArgs = {
    field: SiteBuildMetadataFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SiteBuildMetadataGroupConnectionMaxArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataGroupConnectionMinArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataGroupConnectionSumArgs = {
    field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataSortInput = {
    readonly fields: InputMaybe<
        ReadonlyArray<InputMaybe<SiteBuildMetadataFieldsEnum>>
    >;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type SiteConnection = {
    readonly __typename?: "SiteConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SiteEdge>;
    readonly group: ReadonlyArray<SiteGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<Site>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SiteConnectionDistinctArgs = {
    field: SiteFieldsEnum;
};

export type SiteConnectionGroupArgs = {
    field: SiteFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SiteConnectionMaxArgs = {
    field: SiteFieldsEnum;
};

export type SiteConnectionMinArgs = {
    field: SiteFieldsEnum;
};

export type SiteConnectionSumArgs = {
    field: SiteFieldsEnum;
};

export type SiteEdge = {
    readonly __typename?: "SiteEdge";
    readonly next: Maybe<Site>;
    readonly node: Site;
    readonly previous: Maybe<Site>;
};

export enum SiteFieldsEnum {
    BuildTime = "buildTime",
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    FlagsPreserveFileDownloadCache = "flags___PRESERVE_FILE_DOWNLOAD_CACHE",
    GraphqlTypegen = "graphqlTypegen",
    Host = "host",
    Id = "id",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    JsxRuntime = "jsxRuntime",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    PathPrefix = "pathPrefix",
    Polyfill = "polyfill",
    Port = "port",
    SiteMetadataAuthorName = "siteMetadata___author___name",
    SiteMetadataDescription = "siteMetadata___description",
    SiteMetadataLanguage = "siteMetadata___language",
    SiteMetadataRepository = "siteMetadata___repository",
    SiteMetadataRss = "siteMetadata___rss",
    SiteMetadataSiteUrl = "siteMetadata___siteUrl",
    SiteMetadataSocial = "siteMetadata___social",
    SiteMetadataSocialName = "siteMetadata___social___name",
    SiteMetadataSocialUrl = "siteMetadata___social___url",
    SiteMetadataTitle = "siteMetadata___title",
    TrailingSlash = "trailingSlash",
}

export type SiteFilterInput = {
    readonly buildTime: InputMaybe<DateQueryOperatorInput>;
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly flags: InputMaybe<SiteFlagsFilterInput>;
    readonly graphqlTypegen: InputMaybe<BooleanQueryOperatorInput>;
    readonly host: InputMaybe<StringQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly jsxRuntime: InputMaybe<StringQueryOperatorInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly pathPrefix: InputMaybe<StringQueryOperatorInput>;
    readonly polyfill: InputMaybe<BooleanQueryOperatorInput>;
    readonly port: InputMaybe<IntQueryOperatorInput>;
    readonly siteMetadata: InputMaybe<SiteSiteMetadataFilterInput>;
    readonly trailingSlash: InputMaybe<StringQueryOperatorInput>;
};

export type SiteFlags = {
    readonly __typename?: "SiteFlags";
    readonly PRESERVE_FILE_DOWNLOAD_CACHE: Maybe<Scalars["Boolean"]>;
};

export type SiteFlagsFilterInput = {
    readonly PRESERVE_FILE_DOWNLOAD_CACHE: InputMaybe<BooleanQueryOperatorInput>;
};

export type SiteFunction = Node & {
    readonly __typename?: "SiteFunction";
    readonly absoluteCompiledFilePath: Scalars["String"];
    readonly children: ReadonlyArray<Node>;
    readonly functionRoute: Scalars["String"];
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly matchPath: Maybe<Scalars["String"]>;
    readonly originalAbsoluteFilePath: Scalars["String"];
    readonly originalRelativeFilePath: Scalars["String"];
    readonly parent: Maybe<Node>;
    readonly pluginName: Scalars["String"];
    readonly relativeCompiledFilePath: Scalars["String"];
};

export type SiteFunctionConnection = {
    readonly __typename?: "SiteFunctionConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SiteFunctionEdge>;
    readonly group: ReadonlyArray<SiteFunctionGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SiteFunction>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SiteFunctionConnectionDistinctArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionConnectionGroupArgs = {
    field: SiteFunctionFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SiteFunctionConnectionMaxArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionConnectionMinArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionConnectionSumArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionEdge = {
    readonly __typename?: "SiteFunctionEdge";
    readonly next: Maybe<SiteFunction>;
    readonly node: SiteFunction;
    readonly previous: Maybe<SiteFunction>;
};

export enum SiteFunctionFieldsEnum {
    AbsoluteCompiledFilePath = "absoluteCompiledFilePath",
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    FunctionRoute = "functionRoute",
    Id = "id",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    MatchPath = "matchPath",
    OriginalAbsoluteFilePath = "originalAbsoluteFilePath",
    OriginalRelativeFilePath = "originalRelativeFilePath",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    PluginName = "pluginName",
    RelativeCompiledFilePath = "relativeCompiledFilePath",
}

export type SiteFunctionFilterInput = {
    readonly absoluteCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly functionRoute: InputMaybe<StringQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly matchPath: InputMaybe<StringQueryOperatorInput>;
    readonly originalAbsoluteFilePath: InputMaybe<StringQueryOperatorInput>;
    readonly originalRelativeFilePath: InputMaybe<StringQueryOperatorInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly pluginName: InputMaybe<StringQueryOperatorInput>;
    readonly relativeCompiledFilePath: InputMaybe<StringQueryOperatorInput>;
};

export type SiteFunctionGroupConnection = {
    readonly __typename?: "SiteFunctionGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SiteFunctionEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<SiteFunctionGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SiteFunction>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SiteFunctionGroupConnectionDistinctArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionGroupConnectionGroupArgs = {
    field: SiteFunctionFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SiteFunctionGroupConnectionMaxArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionGroupConnectionMinArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionGroupConnectionSumArgs = {
    field: SiteFunctionFieldsEnum;
};

export type SiteFunctionSortInput = {
    readonly fields: InputMaybe<
        ReadonlyArray<InputMaybe<SiteFunctionFieldsEnum>>
    >;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type SiteGroupConnection = {
    readonly __typename?: "SiteGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SiteEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<SiteGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<Site>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SiteGroupConnectionDistinctArgs = {
    field: SiteFieldsEnum;
};

export type SiteGroupConnectionGroupArgs = {
    field: SiteFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SiteGroupConnectionMaxArgs = {
    field: SiteFieldsEnum;
};

export type SiteGroupConnectionMinArgs = {
    field: SiteFieldsEnum;
};

export type SiteGroupConnectionSumArgs = {
    field: SiteFieldsEnum;
};

export type SitePage = Node & {
    readonly __typename?: "SitePage";
    readonly children: ReadonlyArray<Node>;
    readonly component: Scalars["String"];
    readonly componentChunkName: Scalars["String"];
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly internalComponentName: Scalars["String"];
    readonly matchPath: Maybe<Scalars["String"]>;
    readonly pageContext: Maybe<Scalars["JSON"]>;
    readonly parent: Maybe<Node>;
    readonly path: Scalars["String"];
    readonly pluginCreator: Maybe<SitePlugin>;
};

export type SitePageConnection = {
    readonly __typename?: "SitePageConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SitePageEdge>;
    readonly group: ReadonlyArray<SitePageGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SitePage>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SitePageConnectionDistinctArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageConnectionGroupArgs = {
    field: SitePageFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SitePageConnectionMaxArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageConnectionMinArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageConnectionSumArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageEdge = {
    readonly __typename?: "SitePageEdge";
    readonly next: Maybe<SitePage>;
    readonly node: SitePage;
    readonly previous: Maybe<SitePage>;
};

export enum SitePageFieldsEnum {
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    Component = "component",
    ComponentChunkName = "componentChunkName",
    Id = "id",
    InternalComponentName = "internalComponentName",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    MatchPath = "matchPath",
    PageContext = "pageContext",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    Path = "path",
    PluginCreatorBrowserApIs = "pluginCreator___browserAPIs",
    PluginCreatorChildren = "pluginCreator___children",
    PluginCreatorChildrenChildren = "pluginCreator___children___children",
    PluginCreatorChildrenChildrenChildren = "pluginCreator___children___children___children",
    PluginCreatorChildrenChildrenId = "pluginCreator___children___children___id",
    PluginCreatorChildrenId = "pluginCreator___children___id",
    PluginCreatorChildrenInternalContent = "pluginCreator___children___internal___content",
    PluginCreatorChildrenInternalContentDigest = "pluginCreator___children___internal___contentDigest",
    PluginCreatorChildrenInternalDescription = "pluginCreator___children___internal___description",
    PluginCreatorChildrenInternalFieldOwners = "pluginCreator___children___internal___fieldOwners",
    PluginCreatorChildrenInternalIgnoreType = "pluginCreator___children___internal___ignoreType",
    PluginCreatorChildrenInternalMediaType = "pluginCreator___children___internal___mediaType",
    PluginCreatorChildrenInternalOwner = "pluginCreator___children___internal___owner",
    PluginCreatorChildrenInternalType = "pluginCreator___children___internal___type",
    PluginCreatorChildrenParentChildren = "pluginCreator___children___parent___children",
    PluginCreatorChildrenParentId = "pluginCreator___children___parent___id",
    PluginCreatorId = "pluginCreator___id",
    PluginCreatorInternalContent = "pluginCreator___internal___content",
    PluginCreatorInternalContentDigest = "pluginCreator___internal___contentDigest",
    PluginCreatorInternalDescription = "pluginCreator___internal___description",
    PluginCreatorInternalFieldOwners = "pluginCreator___internal___fieldOwners",
    PluginCreatorInternalIgnoreType = "pluginCreator___internal___ignoreType",
    PluginCreatorInternalMediaType = "pluginCreator___internal___mediaType",
    PluginCreatorInternalOwner = "pluginCreator___internal___owner",
    PluginCreatorInternalType = "pluginCreator___internal___type",
    PluginCreatorName = "pluginCreator___name",
    PluginCreatorNodeApIs = "pluginCreator___nodeAPIs",
    PluginCreatorPackageJson = "pluginCreator___packageJson",
    PluginCreatorParentChildren = "pluginCreator___parent___children",
    PluginCreatorParentChildrenChildren = "pluginCreator___parent___children___children",
    PluginCreatorParentChildrenId = "pluginCreator___parent___children___id",
    PluginCreatorParentId = "pluginCreator___parent___id",
    PluginCreatorParentInternalContent = "pluginCreator___parent___internal___content",
    PluginCreatorParentInternalContentDigest = "pluginCreator___parent___internal___contentDigest",
    PluginCreatorParentInternalDescription = "pluginCreator___parent___internal___description",
    PluginCreatorParentInternalFieldOwners = "pluginCreator___parent___internal___fieldOwners",
    PluginCreatorParentInternalIgnoreType = "pluginCreator___parent___internal___ignoreType",
    PluginCreatorParentInternalMediaType = "pluginCreator___parent___internal___mediaType",
    PluginCreatorParentInternalOwner = "pluginCreator___parent___internal___owner",
    PluginCreatorParentInternalType = "pluginCreator___parent___internal___type",
    PluginCreatorParentParentChildren = "pluginCreator___parent___parent___children",
    PluginCreatorParentParentId = "pluginCreator___parent___parent___id",
    PluginCreatorPluginFilepath = "pluginCreator___pluginFilepath",
    PluginCreatorPluginOptions = "pluginCreator___pluginOptions",
    PluginCreatorResolve = "pluginCreator___resolve",
    PluginCreatorSsrApIs = "pluginCreator___ssrAPIs",
    PluginCreatorVersion = "pluginCreator___version",
}

export type SitePageFilterInput = {
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly component: InputMaybe<StringQueryOperatorInput>;
    readonly componentChunkName: InputMaybe<StringQueryOperatorInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly internalComponentName: InputMaybe<StringQueryOperatorInput>;
    readonly matchPath: InputMaybe<StringQueryOperatorInput>;
    readonly pageContext: InputMaybe<JsonQueryOperatorInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly path: InputMaybe<StringQueryOperatorInput>;
    readonly pluginCreator: InputMaybe<SitePluginFilterInput>;
};

export type SitePageGroupConnection = {
    readonly __typename?: "SitePageGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SitePageEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<SitePageGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SitePage>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SitePageGroupConnectionDistinctArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageGroupConnectionGroupArgs = {
    field: SitePageFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SitePageGroupConnectionMaxArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageGroupConnectionMinArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageGroupConnectionSumArgs = {
    field: SitePageFieldsEnum;
};

export type SitePageSortInput = {
    readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SitePageFieldsEnum>>>;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type SitePlugin = Node & {
    readonly __typename?: "SitePlugin";
    readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
    readonly children: ReadonlyArray<Node>;
    readonly id: Scalars["ID"];
    readonly internal: Internal;
    readonly name: Maybe<Scalars["String"]>;
    readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
    readonly packageJson: Maybe<Scalars["JSON"]>;
    readonly parent: Maybe<Node>;
    readonly pluginFilepath: Maybe<Scalars["String"]>;
    readonly pluginOptions: Maybe<Scalars["JSON"]>;
    readonly resolve: Maybe<Scalars["String"]>;
    readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars["String"]>>>;
    readonly version: Maybe<Scalars["String"]>;
};

export type SitePluginConnection = {
    readonly __typename?: "SitePluginConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SitePluginEdge>;
    readonly group: ReadonlyArray<SitePluginGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SitePlugin>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SitePluginConnectionDistinctArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginConnectionGroupArgs = {
    field: SitePluginFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SitePluginConnectionMaxArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginConnectionMinArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginConnectionSumArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
    readonly __typename?: "SitePluginEdge";
    readonly next: Maybe<SitePlugin>;
    readonly node: SitePlugin;
    readonly previous: Maybe<SitePlugin>;
};

export enum SitePluginFieldsEnum {
    BrowserApIs = "browserAPIs",
    Children = "children",
    ChildrenChildren = "children___children",
    ChildrenChildrenChildren = "children___children___children",
    ChildrenChildrenChildrenChildren = "children___children___children___children",
    ChildrenChildrenChildrenId = "children___children___children___id",
    ChildrenChildrenId = "children___children___id",
    ChildrenChildrenInternalContent = "children___children___internal___content",
    ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
    ChildrenChildrenInternalDescription = "children___children___internal___description",
    ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
    ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
    ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
    ChildrenChildrenInternalOwner = "children___children___internal___owner",
    ChildrenChildrenInternalType = "children___children___internal___type",
    ChildrenChildrenParentChildren = "children___children___parent___children",
    ChildrenChildrenParentId = "children___children___parent___id",
    ChildrenId = "children___id",
    ChildrenInternalContent = "children___internal___content",
    ChildrenInternalContentDigest = "children___internal___contentDigest",
    ChildrenInternalDescription = "children___internal___description",
    ChildrenInternalFieldOwners = "children___internal___fieldOwners",
    ChildrenInternalIgnoreType = "children___internal___ignoreType",
    ChildrenInternalMediaType = "children___internal___mediaType",
    ChildrenInternalOwner = "children___internal___owner",
    ChildrenInternalType = "children___internal___type",
    ChildrenParentChildren = "children___parent___children",
    ChildrenParentChildrenChildren = "children___parent___children___children",
    ChildrenParentChildrenId = "children___parent___children___id",
    ChildrenParentId = "children___parent___id",
    ChildrenParentInternalContent = "children___parent___internal___content",
    ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
    ChildrenParentInternalDescription = "children___parent___internal___description",
    ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
    ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
    ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
    ChildrenParentInternalOwner = "children___parent___internal___owner",
    ChildrenParentInternalType = "children___parent___internal___type",
    ChildrenParentParentChildren = "children___parent___parent___children",
    ChildrenParentParentId = "children___parent___parent___id",
    Id = "id",
    InternalContent = "internal___content",
    InternalContentDigest = "internal___contentDigest",
    InternalDescription = "internal___description",
    InternalFieldOwners = "internal___fieldOwners",
    InternalIgnoreType = "internal___ignoreType",
    InternalMediaType = "internal___mediaType",
    InternalOwner = "internal___owner",
    InternalType = "internal___type",
    Name = "name",
    NodeApIs = "nodeAPIs",
    PackageJson = "packageJson",
    ParentChildren = "parent___children",
    ParentChildrenChildren = "parent___children___children",
    ParentChildrenChildrenChildren = "parent___children___children___children",
    ParentChildrenChildrenId = "parent___children___children___id",
    ParentChildrenId = "parent___children___id",
    ParentChildrenInternalContent = "parent___children___internal___content",
    ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
    ParentChildrenInternalDescription = "parent___children___internal___description",
    ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
    ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
    ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
    ParentChildrenInternalOwner = "parent___children___internal___owner",
    ParentChildrenInternalType = "parent___children___internal___type",
    ParentChildrenParentChildren = "parent___children___parent___children",
    ParentChildrenParentId = "parent___children___parent___id",
    ParentId = "parent___id",
    ParentInternalContent = "parent___internal___content",
    ParentInternalContentDigest = "parent___internal___contentDigest",
    ParentInternalDescription = "parent___internal___description",
    ParentInternalFieldOwners = "parent___internal___fieldOwners",
    ParentInternalIgnoreType = "parent___internal___ignoreType",
    ParentInternalMediaType = "parent___internal___mediaType",
    ParentInternalOwner = "parent___internal___owner",
    ParentInternalType = "parent___internal___type",
    ParentParentChildren = "parent___parent___children",
    ParentParentChildrenChildren = "parent___parent___children___children",
    ParentParentChildrenId = "parent___parent___children___id",
    ParentParentId = "parent___parent___id",
    ParentParentInternalContent = "parent___parent___internal___content",
    ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
    ParentParentInternalDescription = "parent___parent___internal___description",
    ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
    ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
    ParentParentInternalMediaType = "parent___parent___internal___mediaType",
    ParentParentInternalOwner = "parent___parent___internal___owner",
    ParentParentInternalType = "parent___parent___internal___type",
    ParentParentParentChildren = "parent___parent___parent___children",
    ParentParentParentId = "parent___parent___parent___id",
    PluginFilepath = "pluginFilepath",
    PluginOptions = "pluginOptions",
    Resolve = "resolve",
    SsrApIs = "ssrAPIs",
    Version = "version",
}

export type SitePluginFilterInput = {
    readonly browserAPIs: InputMaybe<StringQueryOperatorInput>;
    readonly children: InputMaybe<NodeFilterListInput>;
    readonly id: InputMaybe<StringQueryOperatorInput>;
    readonly internal: InputMaybe<InternalFilterInput>;
    readonly name: InputMaybe<StringQueryOperatorInput>;
    readonly nodeAPIs: InputMaybe<StringQueryOperatorInput>;
    readonly packageJson: InputMaybe<JsonQueryOperatorInput>;
    readonly parent: InputMaybe<NodeFilterInput>;
    readonly pluginFilepath: InputMaybe<StringQueryOperatorInput>;
    readonly pluginOptions: InputMaybe<JsonQueryOperatorInput>;
    readonly resolve: InputMaybe<StringQueryOperatorInput>;
    readonly ssrAPIs: InputMaybe<StringQueryOperatorInput>;
    readonly version: InputMaybe<StringQueryOperatorInput>;
};

export type SitePluginGroupConnection = {
    readonly __typename?: "SitePluginGroupConnection";
    readonly distinct: ReadonlyArray<Scalars["String"]>;
    readonly edges: ReadonlyArray<SitePluginEdge>;
    readonly field: Scalars["String"];
    readonly fieldValue: Maybe<Scalars["String"]>;
    readonly group: ReadonlyArray<SitePluginGroupConnection>;
    readonly max: Maybe<Scalars["Float"]>;
    readonly min: Maybe<Scalars["Float"]>;
    readonly nodes: ReadonlyArray<SitePlugin>;
    readonly pageInfo: PageInfo;
    readonly sum: Maybe<Scalars["Float"]>;
    readonly totalCount: Scalars["Int"];
};

export type SitePluginGroupConnectionDistinctArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginGroupConnectionGroupArgs = {
    field: SitePluginFieldsEnum;
    limit: InputMaybe<Scalars["Int"]>;
    skip: InputMaybe<Scalars["Int"]>;
};

export type SitePluginGroupConnectionMaxArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginGroupConnectionMinArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginGroupConnectionSumArgs = {
    field: SitePluginFieldsEnum;
};

export type SitePluginSortInput = {
    readonly fields: InputMaybe<
        ReadonlyArray<InputMaybe<SitePluginFieldsEnum>>
    >;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export type SiteSiteMetadata = {
    readonly __typename?: "SiteSiteMetadata";
    readonly author: Maybe<SiteSiteMetadataAuthor>;
    readonly description: Maybe<Scalars["String"]>;
    readonly language: Maybe<Scalars["String"]>;
    readonly repository: Maybe<Scalars["String"]>;
    readonly rss: Maybe<Scalars["String"]>;
    readonly siteUrl: Maybe<Scalars["String"]>;
    readonly social: Maybe<ReadonlyArray<Maybe<SiteSiteMetadataSocial>>>;
    readonly title: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataAuthor = {
    readonly __typename?: "SiteSiteMetadataAuthor";
    readonly name: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataAuthorFilterInput = {
    readonly name: InputMaybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataFilterInput = {
    readonly author: InputMaybe<SiteSiteMetadataAuthorFilterInput>;
    readonly description: InputMaybe<StringQueryOperatorInput>;
    readonly language: InputMaybe<StringQueryOperatorInput>;
    readonly repository: InputMaybe<StringQueryOperatorInput>;
    readonly rss: InputMaybe<StringQueryOperatorInput>;
    readonly siteUrl: InputMaybe<StringQueryOperatorInput>;
    readonly social: InputMaybe<SiteSiteMetadataSocialFilterListInput>;
    readonly title: InputMaybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataSocial = {
    readonly __typename?: "SiteSiteMetadataSocial";
    readonly name: Maybe<Scalars["String"]>;
    readonly url: Maybe<Scalars["String"]>;
};

export type SiteSiteMetadataSocialFilterInput = {
    readonly name: InputMaybe<StringQueryOperatorInput>;
    readonly url: InputMaybe<StringQueryOperatorInput>;
};

export type SiteSiteMetadataSocialFilterListInput = {
    readonly elemMatch: InputMaybe<SiteSiteMetadataSocialFilterInput>;
};

export type SiteSortInput = {
    readonly fields: InputMaybe<ReadonlyArray<InputMaybe<SiteFieldsEnum>>>;
    readonly order: InputMaybe<ReadonlyArray<InputMaybe<SortOrderEnum>>>;
};

export enum SortOrderEnum {
    Asc = "ASC",
    Desc = "DESC",
}

export type StringQueryOperatorInput = {
    readonly eq: InputMaybe<Scalars["String"]>;
    readonly glob: InputMaybe<Scalars["String"]>;
    readonly in: InputMaybe<ReadonlyArray<InputMaybe<Scalars["String"]>>>;
    readonly ne: InputMaybe<Scalars["String"]>;
    readonly nin: InputMaybe<ReadonlyArray<InputMaybe<Scalars["String"]>>>;
    readonly regex: InputMaybe<Scalars["String"]>;
};

export type TransformOptions = {
    readonly cropFocus: InputMaybe<ImageCropFocus>;
    readonly duotone: InputMaybe<DuotoneGradient>;
    readonly fit: InputMaybe<ImageFit>;
    readonly grayscale: InputMaybe<Scalars["Boolean"]>;
    readonly rotate: InputMaybe<Scalars["Int"]>;
    readonly trim: InputMaybe<Scalars["Float"]>;
};

export type WebPOptions = {
    readonly quality: InputMaybe<Scalars["Int"]>;
};
